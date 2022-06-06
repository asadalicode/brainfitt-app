import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Style from "./moodComparisonReport.module.scss";
import logo from "../../../../assets/images/edit.svg";
import { getComparisonReportAPICall } from "../../dashboardService/empowermentUnstoppable";
import { ReactComponent as LeftArrow } from "../../../../assets/images/leftArrow.svg";
import {
  postEmojiList,
  preEmojiList,
} from "../../../home/shareFeeling/shareFeeling";
import { getUserData } from "../../../../shared/js/userCredential";
import { Spinner } from "../../../../shared/components/spinner/spinner";

const MoodComparisonReport = ({ sessionId,handlePdfClick }) => {

  const [preEmojis, setPreEmojis] = useState([]);
  const [postEmojis, setPostEmojis] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    let _userData = await getUserData();
    setName(_userData?.firstName + _userData?.lastName);
    if (sessionId) {
      await getComparisonReport();
    }
  }, [sessionId]);
  
  const getComparisonReport = async () => {
    setIsLoading(true);
    let _response = await getComparisonReportAPICall(sessionId);
    setIsLoading(false);
    if (_response.isSuccess) {
      let _preEmojisList = _response.emojisData[0].answer.split(",");
      _preEmojisList = preEmojiList.filter((item) => {
        if (_preEmojisList.includes(item.title)) {
          return item;
        }
      });
      let _postEmojisList = _response.emojisData[1].answer.split(",");
      _postEmojisList = postEmojiList.filter((item) => {
        if (_postEmojisList.includes(item.title)) {
          return item;
        }
      });
      setPreEmojis([..._preEmojisList]);
      setPostEmojis([..._postEmojisList]);
    }
  };
  const handleClick = () => {
    handlePdfClick?.();
  };

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between p-3 ${Style.header}`}
      >
        <div onClick={handleClick} className={`cursor-pointer`}>
          <LeftArrow height={30} width={30} fill={"black"} />
          <span className="ms-2">PDF Viewer</span>
        </div>
        <span onClick={handleClick} className={`cursor-pointer`}>
          Done
        </span>
      </div>
      {!isLoading && (
        <Document>
          <Page size="A4" className={Style.page}>
            <View className={`p-4 ${Style.container}`}>
              <Text className={`${Style.title} mt-5`}>Comparison Report</Text>
              <View className={`${Style.nameContainer} d-flex mt-2`}>
                <Text className={`${Style.nameLabel}`}>Name:</Text>
                {name && <Text className={`${Style.name} ms-2`}>{name}</Text>}
              </View>
              <View className={`${Style.moodContainer} mt-5`}>
                <Text className={`${Style.title} mt-5`}>
                  Pre-Mood Assessment
                </Text>
              </View>
              <View className={`d-flex flex-wrap mt-5 ${Style.emojiContainer}`}>
                {preEmojis.map((emoji) => {
                  return <EmojiBox title={emoji.title} icon={emoji.Icon} />;
                })}
              </View>
              <View className={`${Style.moodContainer} mt-5`}>
                <Text className={`${Style.title} mt-5`}>
                  Post-Mood Assessment
                </Text>
              </View>
              <View className={`d-flex flex-wrap mt-5 ${Style.emojiContainer}`}>
                {postEmojis.map((emoji) => {
                  return <EmojiBox title={emoji.title} icon={emoji.Icon} />;
                })}
              </View>
            </View>
          </Page>
        </Document>
      )}
      {isLoading && <Spinner />}
    </>
  );
};
export default MoodComparisonReport;

const EmojiBox = ({ title, icon }) => {
  return (
    <View className={`d-flex flex-column align-items-center ${Style.emojiBox}`}>
      <img src={icon} />
      <Text className={`${Style.emojiName} mt-2 text-center`}>{title}</Text>
    </View>
  );
};

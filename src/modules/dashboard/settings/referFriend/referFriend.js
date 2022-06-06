import Style from './referFriend.module.scss';
import settingCommonStyle from '../common.module.scss';
import { ReactComponent as Avatar } from '../../../../assets/images/dashboardModule/settings/avatar.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';

import { handleToastMessage } from '../../../../shared/js/handleToastMessage';
  import {InlineShareButtons} from 'sharethis-reactjs';
import { addReferralInviteAPICall, getReferralStatusAPICall } from '../settingService/settingService';
import { Spinner } from '../../../../shared/components/spinner/spinner';

const howItWorkArray = ['Invite Your Friends', 'They Use Your Code To Signup', 'Earn 50 Points On Their First Purchase'];
// const statistics = [
//     { title: 'Friends Invited', count: '42' },
//     { title: 'Friends Joined', count: '23' },
// ];

const ReferFriend = ({referralCode}) => {
    const[statistics, setStatistics]=useState([])
    useEffect(()=>{
        getReferralStatus()
    },[])
    const getReferralStatus = async () => {
        setStatistics(await getReferralStatusAPICall())
    }

    const onCopy = () => {
        handleToastMessage('success','Copied.!')
        onSendReferralCode()
    }
    const onSendReferralCode = () => {
        addReferralInviteAPICall()
    }

    return (
        <>
            <div className={`d-flex justify-content-center mb-3 `}>
                <h5>
                    Refer Freind
                </h5>
            </div>
            <div className={`${settingCommonStyle.contentContainer}`}>
                <div className={`${Style.container}`}>
                    <div className={`d-flex flex-column align-items-center`}>
                        <span className={``}>Refer Freinds To Earn Points</span>
                        <span className={`${Style.copyCode} mt-1`}>Copy Your Code, Share It With Your Friends.</span>
                        <span className={`${Style.text} mt-4 mb-2`}>Your Personal Code</span>
                        <div className={`d-flex cursor-pointer w-100 justify-content-between align-items-center ${Style.personalCodeContainer}`}>
                            <span>{referralCode ? referralCode : <Spinner/>}</span>
                            <div className={Style.copy}>
                                <CopyToClipboard 
                                    text={referralCode}
                                    onCopy={onCopy}>
                                    <span>Copy</span>
                                </CopyToClipboard>
                            </div>
                        </div>


                        <span className={`${Style.text} mt-2`}>OR</span>
                        <div className='d-flex'>
                            <div className={`d-flex mt-3 mx-1 ${Style.iconBox} socialShare`} onClick={onSendReferralCode}>
                                <InlineShareButtons
                                    config={{
                                        alignment: 'center',  // alignment of buttons (left, center, right)
                                        color: 'social',      // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        font_size: 16,        // font size for the buttons
                                        labels: 'cta',        // button labels (cta, counts, null)
                                        language: 'en',       // which language to use (see LANGUAGES)
                                        networks: [           // which networks to include (see SHARING NETWORKS)
                                        'messenger'
                                        ],
                                        padding: 12,          // padding within buttons (INTEGER)
                                        radius: 4,            // the corner radius on each button (INTEGER)
                                        show_total: false,
                                        size: 40,             // the size of each button (INTEGER)
                            
                                        // OPTIONAL PARAMETERS
                                        url: 'https://brainfitt.codesorbit.net', // (defaults to current url)
                                        image: 'https://brainfitt.codesorbit.net/static/media/blissiree.01d46bd68af8cb3938c9dd88d221cd81.svg',  // (defaults to og:image or twitter:image)
                                        description: 'description Blissire',       // (defaults to og:description or twitter:description)
                                        title: 'Blissire',            // (defaults to og:title or twitter:title)
                                        message: 'Blissire',     // (only for email sharing)
                                        subject: 'Blissire',  // (only for email sharing)
                                        username: 'Blissire' // (only for twitter sharing)
                                    }}
                                    />
                            </div>
                            <div className={`d-flex mt-3 mx-1 ${Style.iconBox} socialShare`} onClick={onSendReferralCode}>
                                <InlineShareButtons
                                    config={{
                                        alignment: 'center',  // alignment of buttons (left, center, right)
                                        color: 'social',      // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        font_size: 16,        // font size for the buttons
                                        labels: 'cta',        // button labels (cta, counts, null)
                                        language: 'en',       // which language to use (see LANGUAGES)
                                        networks: [           // which networks to include (see SHARING NETWORKS)
                                        'whatsapp'
                                        ],
                                        padding: 12,          // padding within buttons (INTEGER)
                                        radius: 4,            // the corner radius on each button (INTEGER)
                                        show_total: false,
                                        size: 40,             // the size of each button (INTEGER)
                            
                                        // OPTIONAL PARAMETERS
                                        url: 'https://brainfitt.codesorbit.net', // (defaults to current url)
                                        image: 'https://brainfitt.codesorbit.net/static/media/blissiree.01d46bd68af8cb3938c9dd88d221cd81.svg',  // (defaults to og:image or twitter:image)
                                        description: 'description Blissire',       // (defaults to og:description or twitter:description)
                                        title: 'Blissire',            // (defaults to og:title or twitter:title)
                                        message: 'Blissire',     // (only for email sharing)
                                        subject: 'Blissire',  // (only for email sharing)
                                        username: 'Blissire' // (only for twitter sharing)
                                    }}
                                    />
                            </div>
                            <div className={`d-flex mt-3 mx-1 ${Style.iconBox} socialShare`} onClick={onSendReferralCode}>
                                <InlineShareButtons
                                    config={{
                                        alignment: 'center',  // alignment of buttons (left, center, right)
                                        color: 'social',      // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        font_size: 16,        // font size for the buttons
                                        labels: 'cta',        // button labels (cta, counts, null)
                                        language: 'en',       // which language to use (see LANGUAGES)
                                        networks: [           // which networks to include (see SHARING NETWORKS)
                                        'skype'
                                        ],
                                        padding: 12,          // padding within buttons (INTEGER)
                                        radius: 4,            // the corner radius on each button (INTEGER)
                                        show_total: false,
                                        size: 40,             // the size of each button (INTEGER)
                            
                                        // OPTIONAL PARAMETERS
                                        url: 'https://brainfitt.codesorbit.net', // (defaults to current url)
                                        image: 'https://brainfitt.codesorbit.net/static/media/blissiree.01d46bd68af8cb3938c9dd88d221cd81.svg',  // (defaults to og:image or twitter:image)
                                        description: 'description Blissire',       // (defaults to og:description or twitter:description)
                                        title: 'Blissire',            // (defaults to og:title or twitter:title)
                                        message: 'Blissire',     // (only for email sharing)
                                        subject: 'Blissire',  // (only for email sharing)
                                        username: 'Blissire' // (only for twitter sharing)
                                    }}
                                    />
                            </div>
                            <div className={`d-flex mt-3 mx-1 ${Style.iconBox} socialShare`} onClick={onSendReferralCode}>
                                <InlineShareButtons
                                    config={{
                                        alignment: 'center',  // alignment of buttons (left, center, right)
                                        color: 'social',      // set the color of buttons (social, white)
                                        enabled: true,        // show/hide buttons (true, false)
                                        font_size: 16,        // font size for the buttons
                                        labels: 'cta',        // button labels (cta, counts, null)
                                        language: 'en',       // which language to use (see LANGUAGES)
                                        networks: [           // which networks to include (see SHARING NETWORKS)
                                        'twitter'
                                        ],
                                        padding: 12,          // padding within buttons (INTEGER)
                                        radius: 4,            // the corner radius on each button (INTEGER)
                                        show_total: false,
                                        size: 40,             // the size of each button (INTEGER)
                            
                                        // OPTIONAL PARAMETERS
                                        url: 'https://brainfitt.codesorbit.net', // (defaults to current url)
                                        image: 'https://brainfitt.codesorbit.net/static/media/blissiree.01d46bd68af8cb3938c9dd88d221cd81.svg',  // (defaults to og:image or twitter:image)
                                        description: 'description Blissire',       // (defaults to og:description or twitter:description)
                                        title: 'Blissire',            // (defaults to og:title or twitter:title)
                                        message: 'Blissire',     // (only for email sharing)
                                        subject: 'Blissire',  // (only for email sharing)
                                        username: 'Blissire' // (only for twitter sharing)
                                    }}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className={`${Style.howItWork}  mt-3`}>
                        <span className='mb-3'>How It Work?</span>
                        <div className='mt-3'>
                            {
                                howItWorkArray.map((description, index) =>

                                    <div key={Math.random()} className={`d-flex align-items-center mb-2 ${Style.container}`}>
                                        <div className={`d-flex  align-items-center justify-content-center rounded-circle ${Style.label}`}>
                                            {index + 1}
                                        </div>
                                        <p className={`p-0 m-0 ms-3 ${Style.text}`}>{description}</p>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    <div className={`${Style.statistic}  mt-3`}>
                        <span className='mb-3'>Statistics</span>
                        <div className='mt-3'>
                            <div key={Math.random()} className={`d-flex align-items-center justify-content-between mb-2 
                                ${Style.statisticCard}`}>
                                <div className={`d-flex align-items-center ${Style.left}`}>
                                    <div className={`d-flex align-items-center justify-content-center rounded-circle ${Style.avatar}`}>
                                        <Avatar height={20} width={20} fill="rgba(206, 205, 205, 0.6)" />
                                    </div>
                                    <p className={`p-0 m-0 ms-2 ${Style.text}`}>Friends Invited</p>
                                </div>
                                <span className={`${Style.count}`}>{statistics.friends_invites}</span>
                            </div>
                            <div key={Math.random()} className={`d-flex align-items-center justify-content-between mb-2 
                                ${Style.statisticCard}`}>
                                <div className={`d-flex align-items-center ${Style.left}`}>
                                    <div className={`d-flex align-items-center justify-content-center rounded-circle ${Style.avatar}`}>
                                        <Avatar height={20} width={20} fill="rgba(206, 205, 205, 0.6)" />
                                    </div>
                                    <p className={`p-0 m-0 ms-2 ${Style.text}`}>Friends Joined</p>
                                </div>
                                <span className={`${Style.count}`}>{statistics.friends_joined}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default ReferFriend;
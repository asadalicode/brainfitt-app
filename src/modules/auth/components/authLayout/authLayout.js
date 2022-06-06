import Style from './authLayout.module.scss';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';


const AuthLayout = ({ LeftComponent, RightComponent, rightBackgroundImage, isOtp }) => {
    const [isMobileTab, setIsMobileTab] = useState(false);
    const [skip, setSkip] = useState(false);
    const handleResize = () => {
        setIsMobileTab(window.innerWidth <= 850);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return window.removeEventListener("resize", handleResize());
    }, []);

    const handleSkip = () => {
        setSkip(true);
    }

    return (
        <div className={`container-fluid ${Style.mainContainer}`}>
            <div className='row'>
                {
                    (!isMobileTab || !skip) &&
                    <div className={`col-lg-5 col-sm-12 d-flex flex-column justify-content-center ${Style.leftContainer}`}>
                        <LeftComponent />
                        {isMobileTab &&
                            <div className={`${Style.skipButton}`}>
                                <button onClick={handleSkip} className={`white-btn ${Style.skip}`}>Skip</button>
                            </div>
                        }
                    </div>
                }
                {(!isMobileTab || skip) &&
                    <div className={`col-sm-12 col-lg-7 p-0`}>
                        <div className={`${Style.rightContainer} ${isOtp ? Style.otpBgPosition : Style.signUpBgPosition} d-flex align-items-end`}

                            style={{ backgroundImage: `url(${rightBackgroundImage})` }}
                        >
                            {/* {!isMobileTab && */}
                            {/* <img src={rightBackgroundImage} className={`${Style.rightImage}`} /> */}
                            {/* } */}
                            <Container className={`${Style.contentBox} mb-3`}>
                                <RightComponent />
                            </Container>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}
export default AuthLayout;
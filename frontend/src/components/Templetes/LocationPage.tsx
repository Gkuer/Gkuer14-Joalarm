import Button from '../Atoms/Button';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { readEmojiAPI } from '../../api/emojiAPI';
import { AlertContext } from '../../store/alertContext';

const LocationPage = () => {
  const navigate = useNavigate();
  const { openAlert, setAlertText, setAlertSeverity } =
    useContext(AlertContext);
  const geoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setAlertSeverity('success');
        setAlertText('위치 동의 성공');
        openAlert();
        navigate('/mainpage');
      },
      function (error) {
        navigate('/location');
        setAlertSeverity('error');
        setAlertText('위치를 켜주세요');
        openAlert();
      },
    );
  };
  const [slides1, setSildes1] = useState([]);
  const [slides2, setSildes2] = useState([]);
  const [slides3, setSildes3] = useState([]);

  useEffect(() => {
    callReadEmojiAPI();
  }, []);

  const callReadEmojiAPI = () => {
    const emojiUrl = sessionStorage.getItem('emojiUrl') || '';
    readEmojiAPI({ emojiUrl: emojiUrl })
      .then((res: any) => {
        console.log(res);
        setSildes1(res.slice(0, 25));
        setSildes2(res.slice(26, 51));
        setSildes3(res.slice(52));
      })
      .then(() => {
        console.log(slides3);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <BackGround>
      <TitleTag>
        위치 정보를 켜면{'\n'}
        다른 사람들의 하트를{'\n'}
        받아볼 수 있어요!
      </TitleTag>
      <Button
        width="160px"
        height="40px"
        bgColor="white"
        textColor="black"
        fontSize="12px"
        icon={<IoLocationSharp />}
        shadow
        onClick={geoPosition}
      >
        위치 정보 켜기
      </Button>
      <MarginDiv>
        <EmojiDiv>
          {slides1.map((slide) => (
            <div key={slide} className="emoji">
              <EmojiImg src={slide} alt={slide} />
            </div>
          ))}
        </EmojiDiv>
        <ReverseEmojiDiv>
          {slides2.map((slide) => (
            <div key={slide} className="emoji">
              <EmojiImg src={slide} alt={slide} />
            </div>
          ))}
        </ReverseEmojiDiv>
        <EmojiDiv>
          {slides3.map((slide) => (
            <div key={slide} className="emoji">
              <EmojiImg src={slide} alt={slide} />
            </div>
          ))}
        </EmojiDiv>
      </MarginDiv>
    </BackGround>
  );
};

const TitleTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 40px;
`;
const BackGround = styled.div`
  background: linear-gradient(197.56deg, #63dae2 0%, #7fade8 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EmojiDiv = styled.div`
  display: flex;
  .emoji {
    margin: 0px 10px 5px 10px;
  }
  animation-name: move;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes move {
    from {
      transform: translateX(-250px);
    }
    to {
      transform: translateX(250px);
    }
  }
`;
const ReverseEmojiDiv = styled(EmojiDiv)`
  animation-direction: alternate-reverse;
  @keyframes move {
    from {
      transform: translateX(250px);
    }
    to {
      transform: translateX(-250px);
    }
  }
`;

const EmojiImg = styled.img`
  width: 60px;
  height: 60px;
  @media (max-height: 450px) {
    width: 20px;
    height: 20px;
  }
  @media (min-height: 1100px) {
    width: 100px;
    height: 100px;
  }
  @media (min-height: 800px) {
    width: 80px;
    height: 80px;
  }
`;

const MarginDiv = styled.div`
  margin-top: 2rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
`;
export default LocationPage;

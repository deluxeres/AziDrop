import React, { useState } from "react";
import "./header.scss";
import contractImg from "../../Assets/images/Header/contracts1.png"
import battleImg from "../../Assets/images/Header/battle.png"
import upgradeImg from "../../Assets/images/Header/upgrade.png"
import bonusImg from "../../Assets/images/Header/bonus.png"
import { Link } from "react-router-dom";
import { Input, Text } from "@chakra-ui/react";
import bonusBtn from "../../Assets/images/bonus.png";
import { authLink } from '../../app/services/baseQueries';
import { useSelector } from 'react-redux';
import { isUserLogin } from '../../app/userSlice';

function Header(props) {
  const isLogin = useSelector(isUserLogin);
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  const userData = props.userData || {};

  return (
    <div className="header-section">
      <div className="header">
        <div className="container">
          <div className="header__menu">
            <div className="header__right">

              {!isLogin &&
                <a href={authLink} className="header__profile-login">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="17" viewBox="0 0 28 17">
                      <path fill="#FFF" d="M25.9049778,4.83497778 C25.9049778,6.26048889 24.7448444,7.41657778 23.3140444,7.41657778 C21.8816889,7.41657778 20.7224889,6.26048889 20.7224889,4.83497778 C20.7224889,3.40946667 21.8823111,2.25368889 23.3140444,2.25368889 C24.7448444,2.25368889 25.9049778,3.40946667 25.9049778,4.83497778 Z M24.8608889,9.19675556 L21.7230222,11.8704444 C21.7569333,12.0838667 21.7799556,12.3007111 21.7799556,12.5231556 C21.7799556,14.7992444 19.9276,16.6447556 17.6434222,16.6447556 C15.6728444,16.6447556 14.0273778,15.2715111 13.6104889,13.4340889 L5.85417778,10.8123556 C5.24128889,11.2759111 4.47937778,11.5546667 3.65057778,11.5546667 C1.63457778,11.5543556 0,9.92537778 0,7.91684444 C0,5.90862222 1.63457778,4.28057778 3.65057778,4.28057778 C5.38408889,4.28057778 6.832,5.48457778 7.20564444,7.09768889 L14.6981333,9.63044444 C15.428,8.89342222 16.4344444,8.43142222 17.5497778,8.40653333 L18.6719556,5.00795556 C18.6685333,4.94044444 18.6616889,4.87386667 18.6616889,4.80573333 C18.6616889,2.23751111 20.7523556,0.155555556 23.3308444,0.155555556 C25.9090222,0.155555556 28,2.23751111 28,4.80573333 C28,6.8404 26.6868,8.5652 24.8608889,9.19675556 Z M5.94595556,6.67208889 C5.50977778,5.88995556 4.67257778,5.36013333 3.71093333,5.36013333 C2.29911111,5.36013333 1.15453333,6.50035556 1.15453333,7.90657778 C1.15453333,9.3128 2.29911111,10.4527111 3.71093333,10.4527111 C3.97195556,10.4527111 4.22333333,10.4138222 4.4604,10.3413333 L3.24582222,9.93097778 C2.26706667,9.40893333 1.89871111,8.19528889 2.42293333,7.22026667 C2.94746667,6.24586667 4.16577778,5.87937778 5.1436,6.40142222 L5.94595556,6.67208889 Z M19.6896,4.81693333 C19.6896,6.81177778 21.3129778,8.42893333 23.3156,8.42893333 C25.3182222,8.42893333 26.9425333,6.81177778 26.9425333,4.81693333 C26.9425333,2.82115556 25.3179111,1.204 23.3156,1.204 C21.3129778,1.204 19.6896,2.82115556 19.6896,4.81693333 Z M19.7611556,12.8765778 C19.7611556,11.3580444 18.5251111,10.1263556 17.0006667,10.1263556 C16.7866222,10.1263556 16.5800444,10.1531111 16.3803111,10.1985333 L17.9231111,10.7199556 C18.9015556,11.2426222 19.2689778,12.4559556 18.7450667,13.4300444 C18.2208444,14.406 17.0025333,14.7715556 16.0247111,14.2498222 L14.3621333,13.6876444 C14.7093333,14.8104444 15.7593333,15.6264889 17.0006667,15.6264889 C18.5251111,15.6268 19.7611556,14.3951111 19.7611556,12.8765778 Z" />
                    </svg>
                    Войти через Steam
                  </button>
                </a>
              }

              {isLogin &&
                <Link to="/profile" className="header-profile">
                  <div className="header__right-profile">
                    <div className="header-profile__user">
                      <div className="header-profile__img">
                        <img src={userData.avatar} alt="user" />
                      </div>
                    </div>
                    <div className="header-profile__block">
                      <span className="header-profile__name">{userData.name}</span>
                      <div className="header-profile__balance">
                        <span>{userData.balance} Р</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShow(!show)}
                    className="header-profile__deposit"
                  >
                    Пополнить
                  </button>
                </Link>
              }

            </div>
            <div className="header__left">
              <div className="header__link">
                <nav>
                  <ul>
                    <li>
                      <Link className="headerMenu__link" to="/contracts">
                        <div className="header-svg">
                          <img src={contractImg} alt="link" />
                        </div>
                        Контракты
                      </Link>
                    </li>
                    <li>
                      <Link className="headerMenu__link" to="/cases">
                        <div className="header-svg">
                          <img src={battleImg} alt="link" />
                        </div>
                        Сражения
                      </Link>
                    </li>
                    <li>
                      <Link className="headerMenu__link" to="/dailybonus">
                        <div className="header-svg">
                          <img src={upgradeImg} alt="link" />
                        </div>
                        Upgrade
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <Link to="/bonus" className="header__menu-btn">
              <img src={bonusBtn} alt="link" />
            </Link>
            {show && (
              <div className="pay-popup">
                <div className="popup-modal">
                  <div className="popup-modal__container">
                    <button
                      className="popup-modal__btn"
                      onClick={() => setShow(!show)}
                    >
                      <svg
                        fill="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="23px"
                        height="23px"
                      >
                        <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                      </svg>
                    </button>
                    <div className="popup-modal__title">
                      <p>Пополнение баланса</p>
                    </div>
                    <div className="popup-wrapper">
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/cards.e2f19d4d.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/qiwi.78b0a233.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/youmoney.ed9a1d75.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/alfabank.22ba2811.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/ecopayz.5840fd41.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/tron.81a8c177.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/sberbank.c77a6642.svg"
                          alt="card"
                        />
                      </div>
                      <div className="tab-card">
                        <img
                          src="https://ggdrop.gg/static/media/bitcoin.4660a169.svg"
                          alt="card"
                        />
                      </div>
                    </div>
                    <div className="popup-modal__sum">
                      <Text color="white" mb="20px" mt="15px">
                        К оплате: {value} руб.
                      </Text>
                      <Input
                        value={value}
                        onChange={handleChange}
                        placeholder="Введите сумму пополнения"
                        size="sm"
                      />
                    </div>
                    <div className="popup-modal__sum">
                      <input
                        placeholder="FREE#234235"
                        size="sm"
                      />
                    </div>
                    <button className="popup-modal__pay">Пополнить счет</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

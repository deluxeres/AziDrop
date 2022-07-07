import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import bumble1 from "../../../Assets/images/bumble.png";
import bumble2 from "../../../Assets/images/bumble2.png";
import "./CasePage.scss";
import db from "../../../DataBase/Live.json";
import caseItem from "../../../DataBase/CaseItems.json";
import Statictic from "../Statictic/Statictic"
import { useDispatch, useSelector } from 'react-redux';
import CaseSpinner from '../../CaseSpinner/CaseSpinner';
import { isCaseSpin, setCaseSpin } from '../../../app/caseSlice';
import OpenedCase from '../../OpenedCase/OpenedCase';
import { useGetCategoriesQuery } from '../../../app/services/caseApi';
import { apiHost } from '../../../app/services/baseQueries';
import { useOpenCaseMutation } from '../../../app/services/userApi';
import { getBadgeClass } from '../../../functions/getBadge';
import { OpenCase } from '../../../app/services/openCase';

function CasePage() {
  const [openedCaseState, setOpenedCaseState] = useState({ isOpened: false, data: {} });
  const { id } = useParams();
  const dispatch = useDispatch();
  const isSpin = useSelector(isCaseSpin);
  const [isQuickOpening, setQuickOpen] = useState(false);
  const { data, isLoading } = useGetCategoriesQuery();

  let caseElem = null;

  if (data) {
    for (const category of data) {
      for (const item of category.cases) {
        if (+item.id === +id) {
          caseElem = item;
        }
      }
    }
  }

  const spinCase = function () {
    dispatch(setCaseSpin(true));
  }

  const quickOpen = async function () {
    setQuickOpen(true);

    const res = await OpenCase(caseElem.id);
    const id = res.data.id;

    for (const item of caseElem.skins) {
      if (item.id === id) {
        dispatch(setCaseSpin(false));

        setOpenedCaseState({
          isOpened: true,
          data: item
        });

        setQuickOpen(false);

        break;
      }
    }
  }

  const getRandomIdForSpin = async function () {
    const res = await OpenCase(caseElem.id);
    return res.data.id;
  }

  const onStopSpinner = async function (id) {
    for (const item of caseElem.skins) {
      if (item.id === id) {
        dispatch(setCaseSpin(false));

        setOpenedCaseState({
          isOpened: true,
          data: item
        });
        break;
      }
    }
  }

  const tryAgain = function () {
    setOpenedCaseState({
      isOpened: false
    });
  }

  const take = function () {
    setOpenedCaseState({
      isOpened: false
    });
  }

  const getBadge = function (name) {
    return getBadgeClass(name);
  }

  return (isLoading || !caseElem) ? null : (
    <div className="case-page">
      <div className="container">
        <div className="case-wrapper" id="caseWrap">
          <div className="case-wrapper-container">
            <div className="case-mystery">
              <span className="case-mystery__price">
                Стоимость кейса{" "}
                <span className="case-mystery__sum">{caseElem.price} Р</span>
              </span>
              <span className="case-mystery__text">
                Открывай и испытывай удачу
              </span>
            </div>
            <div className="case__container">
              <div className="case__innerName">
                <span></span>
              </div>
              <div className="case__name">
                <span>{caseElem.name}</span>
              </div>

              {!isSpin && !openedCaseState.isOpened &&
                <>
                  <div className="case__image">
                    <img src={caseElem.img.replace('localhost', apiHost)} alt="case" />
                  </div>
                  <div className="case-buttons">
                    <div className="case-button__spin">
                      <button onClick={spinCase}>Прокрутить за {caseElem.price} Р</button>
                    </div>
                    <div className="case-button__quick">
                      <button onClick={quickOpen} disabled={isQuickOpening}>Открыть быстро</button>
                    </div>
                  </div>
                </>
              }

              {isSpin &&
                <CaseSpinner
                  data={caseElem.skins}
                  getRandomId={getRandomIdForSpin}
                  onStop={onStopSpinner}
                />
              }

              {openedCaseState.isOpened &&
                <OpenedCase data={openedCaseState.data} tryAgain={tryAgain} take={take} />
              }

            </div>
          </div>
          <div className="wrapper-bumble__1">
            <img src={bumble1} alt="bumble" />
          </div>
          <div className="wrapper-bumble__2">
            <img src={bumble2} alt="bumble" />
          </div>
        </div>
        <div className="case-content">
          <span className="case-content__title">Содержимое кейса</span>
          <div className="case-content__wrapper">
            {caseElem.skins.map((itemGun) => {
              return (
                <div className="case-content__item" key={itemGun.id}>
                  <div className="case-badge">
                    <span className="case-badge__silver"></span>
                  </div>
                  <div className="case-item__img">
                    <img src={itemGun.img} alt="itemGun" />
                  </div>
                  <span className="case-item__name">{itemGun.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <Statictic />
      </div>
    </div>
  );
}

export default CasePage;

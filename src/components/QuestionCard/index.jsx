import React, { useEffect, useState } from "react";
import { useNavData } from "../../context/NavContext";
import "./style.css";

function QuestionCard({ question, options, qId }) {
    const { objSelected, setObjSelected} = useNavData();

    return (
        <>
            <div id="questionBoxSireneEvaluation">
                <div>
                    <legend id="questionBox" className="perguntaAvaliacao">{question}</legend>
                    {
                        <select onChange={(e) => setObjSelected(objSelected.concat({idQuestion: qId, option:question , value: e.target.value,}))} id="dropdownMenu" required tabIndex="1">
                            <option key="0" className="menuOptions" value="0">Selecione a sua opção</option>
                                if({options!==[]}) = {
                                    options.map(item => {
                                        return (
                                            <option key={item.id} className="menuOptions" text={item.option} value={item.value}>{item.option}</option>
                                        );
                                    })
                                }
                        </select>
                    }
                </div>
                <div id="endBarSireneEvaluation"></div>
            </div>
        </>
    );
}
export default QuestionCard;
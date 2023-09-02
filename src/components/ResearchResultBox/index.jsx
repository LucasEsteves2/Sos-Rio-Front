import React, { useEffect, useState } from "react";
import ResearchGraph from "../ResearchGraph";
import "./style.css";

function ResearchResultBox({ key, question, option1, option2, option3, option4, option5, sumoption1, sumoption2, sumoption3, sumoption4, sumoption5 }) {
    const [options, setOptions] = useState([option1, option2, option3, option4, option5]);
    const [results, setResults] = useState([sumoption1, sumoption2, sumoption3, sumoption4, sumoption5]);
    
    return (
        <>
            <div id="cardBodyContainerResearch">
                <div id="cardResearchQuestionResultBox">
                    <div id="cardSubTitleResearch" tabIndex="1">
                        <h3>{question}</h3>
                    </div>
                    <div id="cardContentContainerResearch">
                        {
                            // options !== undefined && results !== undefined ?
                            options.map(() => {
                                return (
                                <ResearchGraph key={key} series={results} labels={options} />
                                );
                            
                            })
                            // :null
                        }

                    </div>
                </div>
                <div id="endBarZdRF"></div>
            </div>
        </>
    );
}

export default ResearchResultBox;
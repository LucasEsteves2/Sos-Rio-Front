import "./style.css";


function FormularioPesquisaPontosApoio () {

    return (
        <div className="container">
            <div className="segundoContainer">
                <div className="terceiroContainer">

                <h1 className="titulo">Pesquisa de Pontos de Apoio</h1>
                <p style={{fontSize:20}}>Por favor forneça o número do Ponto de Apoio</p>
                                
                <input type="number" className="input"></input>
                <p style={{fontSize:20}}>Conhece o funcionamento dos pontos de apoio? (0-Conhece muito bem a 6-Desconhece totalmente)</p>
                
                <input type="number" className="input"></input>
                <br></br>
                <br></br>
                <p style={{fontSize:20}}>Conhece as orientação da Defesa Civil para que os moradores de áreas de risco se desloquem para os pontos de apoio? (0-Conhece muito bem a 6-Desconhece totalmente)</p>
                <input type="number" className="input"></input>
                <br></br>
                
                <p style={{fontSize:20}}>Conhece as orientações para que os moradores de área de risco tenham sempre um kit de emergência preparado para o caso de haver necessidade de deslocamento? (0-Conhece muito bem a 6-Desconhece totalmente)</p>
                
                <br></br>
                <input type="number" className="input"></input>
                
                <br></br>
                <p style={{fontSize:20}}>Este centro de apoio é capaz de abrigar toda a população da região em uma eventual situação de risco? (0-Conhece muito bem a 6-Desconhece totalmente) </p>
                <input type="number" className="input"></input>
                
                <br></br>
                <p style={{fontSize:20}}>Como você avalia a localização deste centro de apoio? (0-Conhece muito bem a 6-Desconhece totalmente)</p>
                <input type="number" className="input"></input>
                
                <br></br>
                <p style={{fontSize:20}}>Você conhece as rotas de fuga para o ponto de apoio? (0-Conhece muito bem a 6-Desconhece totalmente)</p>
                <input type="number" className="input"></input>
                <br></br>
                       
                
                
                <div className="buttonContainer">
                <button className="button">FINALIZAR</button>
                <button className="button">CANCELAR</button>
                </div>
                </div>

            </div>
        </div>

    );
}

export default FormularioPesquisaPontosApoio;
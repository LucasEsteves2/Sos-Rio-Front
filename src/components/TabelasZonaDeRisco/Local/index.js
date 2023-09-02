import './style.css';

function  TabelaDeclividade () {

   


    return(
          <form method='post'>

        <div className="container">
        <div className="segundoContainer">
            <div className="terceiroContainer">

            <h1 className="titulo">Tabela local</h1>
        
            <label className="label">Local</label>
            <input type="text" name="local" required className="input"></input>
            <label className="label">sigla</label>
            <input type="text"  name="siglas" required className="input"></input>
            <label className="label">Faixa marginal </label>
            <input type="number" name="Faixa marginal " required className="input"></input>
            <label className="label">Probabilidade </label>
            <input type="number" name="Probabilidade " required className="input"></input>
           
            
           
            <div className="buttonContainer">
            <button className="button">FINALIZAR</button>
            <button className="button">CANCELAR</button>
            </div>
            </div>

        </div>
    </div>
        </form>



    )


}

export default TabelaDeclividade;

import './style.css';

function  TabelaDeclividade () {

   


    return(
          <form method='post'>

        <div className="container">
        <div className="segundoContainer">
            <div className="terceiroContainer">

            <h1 className="titulo">Cadastrar declividade</h1>
        
            <label className="label">Descrição</label>
            <input type="text" name="desciçao declividade" required className="input"></input>
            <label className="label">Tipologia de Movimento</label>
            <input type="text"  name="tipologia" required className="input"></input>
            <label className="label">Probabilidade equivalente</label>
            <input type="number" name="probabilidade" required className="input"></input>
           
            
           
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

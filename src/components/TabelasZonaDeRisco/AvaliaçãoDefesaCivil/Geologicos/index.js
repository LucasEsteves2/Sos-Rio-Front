import './style.css';

function  TabelaGeologicos () {

   


    return(
          <form method='post'>

        <div className="container">
        <div className="segundoContainer">
            <div className="terceiroContainer">

            <h1 className="titulo">class</h1>
        
            <label className="label">Classe vegetação</label>
            <input type="text" name="classe vegetação" required className="input"></input>
            <label className="label">sigla</label>
            <input type="text"  name="sigla" required className="input"></input>
            <label className="label">Probabilidade </label>
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

export default TabelaGeologicos;

import './style.css'

function CadastroSirene () {


    return(
        <form method='post'>

        <div className="container">
        <div className="segundoContainer">
            <div className="terceiroContainer">

            <h1 className="titulo">Cadastro Sirene</h1>
            <label className="label">Descrição</label>
            <input type="text" name="descrição" required className="input"></input>
            <label className="label">Latitude</label>
            <input type="text" name="latitude" required className="input"></input>
            <label className="label">Longitude</label>
            <input type="text"  name="longitude" required className="input"></input>
            <label className="label">Raio de alcance (Km)</label>
            <input type="range" name="raio" min="0" max="10" required className="input"></input>
            <label className="label">Localização</label>
            <input type="text" name="localização" required className="input"></input>
            <label className="label">Bairro</label>
            <input type="text" name="bairro" required className="input"></input>
            <label className="label">Endereço</label>
            <input type="text" name="endereço" required className="input"></input>
            
           
            <div className="buttonContainer">
            <button className="button">FINALIZAR</button>
            <button className="button">CANCELAR</button>
            </div>
            </div>

        </div>
    </div>
        </form>




    );



}


export default CadastroSirene;
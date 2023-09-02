import React from 'react';
import './style.css';

function Footer() {

    return (
        <>
            <div id="footerContainer">
                <a tabIndex="1" className="usefullContacts" target="_blank" href="tel:+2430641490">Telefone de contato: (24) 3064-1490</a>
                <a tabIndex="1" className="usefullContacts" target="_blank" href="email:paricontato@uff.com">E-mail de contato: paricontato@uff.com</a>
                <a tabIndex="1" className="usefullContacts" target="_blank" href="tel:+199">Contato Defesa Civil: 199</a>
                <a tabIndex="1" className="usefullContacts" target="_blank" href="tel:+193">Contato Bombeiros: 193</a>
                <a tabIndex="1" className="usefullContacts" target="_blank" href="tel:+192">Contato SAMU: 192</a>
            </div>
        </>
    );
}

export default Footer;
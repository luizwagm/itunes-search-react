import React, { Component } from 'react';
import api from "../../services/api";
import {Link} from 'react-router-dom';

import './styles.css';

export default class Main extends Component{
	state = {
		dados: [],
		dadosInfo: {},
		page: 1,
		qual: 0,
	}

	componentDidMount(){
		this.loadDados();
	}

	loadDados = async (page = 1, busca = '', tipo = 'album') => {
		const response = await api.get(`/search?term=${busca}&limit=20&entity=${tipo},song&country=br`);
			document.querySelector('i').remove();

		const { results, ...dadosInfo } = response.data;


		this.setState({dados: results, dadosInfo, page});
	};

	pesquisar = () => {
		
		var busca = document.getElementsByName("word")[0].value;
		var tipo = document.querySelector('input[name="tipo"]:checked').value;

		if(tipo == 'album'){
			var qual = 1;
		}else{
			var qual = 2;
		}

		this.setState({qual});

		var p = document.createElement("i");
	    var t = document.createTextNode('Carregando...');
	    p.appendChild(t);

		document.querySelector('.buttonSearch').appendChild(p);

		this.loadDados(1,busca,tipo);

		document.getElementsByName("word")[0].value = '';

	}

	render(){

		const {dados, page, dadosInfo, qual} = this.state;


			return (

				<div className="product-list">

				<div>
					<input type="text" name="word" placeholder="Digite sua busca aqui" />
				</div>
				<div className="radioButtons">
					<label>
						<input type="radio" name="tipo" value="album" defaultChecked={true} />
						Album
					</label>

					<label>
						<input type="radio" name="tipo" value="song" />
						Músicas
					</label>
				</div>
				<div className="buttonSearch">
					<button onClick={this.pesquisar}>Pesquisar</button>
				</div>
				<i></i>
				
				{dados.map(dado =>
					 

						{

							if(qual == 1)
								return <article key={Math.random()}>
											<div className="min100"><img src={dado.artworkUrl100} />
											<strong>{dado.artistName}</strong>
											<p className="color1">{dado.collectionName}</p>
											<p>Preço do álbum: R$ {dado.collectionPrice}0</p>
											<p>Gênero: {dado.primaryGenreName}</p>


											</div>
											<div>
												<a href={dado.collectionViewUrl} target="_blank">Acessar álbum</a>
											</div>

										
										</article>
							return <article key={Math.random()}>
										<div className="min100"><img src={dado.artworkUrl100} />
										<strong>{dado.artistName}</strong>
										<p className="color1">{dado.collectionName}</p>
										<p className="color2">{dado.trackName}</p>
										<p>Preço do álbum: R$ {dado.collectionPrice}0</p>
										<p>Preço da música: R$ {dado.trackPrice}0</p>
										<p>Gênero: {dado.primaryGenreName}</p>


										</div>
										<div>
											<a href={dado.trackViewUrl} target="_blank">Acessar música</a>
										</div>

									
									</article>



						}
					

						
				)}
					
				</div>
			);
		
	}
}
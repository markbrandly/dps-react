import React, { Component } from 'react';
import {SpellBook} from '../lib/SpellBook.js';

//this spell code is a mess. Condensing 42 spells down to just a few UI options. Abomination


export class AttackerSpells extends Component{
	constructor(props){
		super(props)
		var spellBook = new SpellBook().tierObject(this.props.player.spell).spellBook
		this.state = {
			spellBook: spellBook
		}



		this.handleChangeBook = this.handleChangeBook.bind(this)
		this.handleSetElement = this.handleSetElement.bind(this)
		this.handleSetTier = this.handleSetTier.bind(this)
		this.handleSpecialSpell = this.handleSpecialSpell.bind(this)
		this.handleClearSpell = this.handleClearSpell.bind(this)
	}

	handleChangeBook(e){
		if(e.target.checked){
			console.log(e.target.value)
			this.setState({spellBook: e.target.value})
		}
	}

	handleSetElement(e){
		var spellObj = new SpellBook().tierObject(this.props.player.spell)
		console.log(e.target.value)
		console.log(spellObj)
		//this is really ugly!!!
		if(e.target.checked){
			if (['Wind', 'Water', 'Earth', 'Fire'].includes(e.target.value)){
				if(spellObj.spellBook != "standard" || this.props.player.spell === null){
					this.props.setSpell(e.target.value + " Strike");
				}
				else{
					this.props.setSpell(e.target.value + " " + spellObj.tier);
				}
			}

			else if(['Smoke', 'Shadow', 'Blood', 'Ice'].includes(e.target.value)){
				if(spellObj.spellBook != "ancient"){
					this.props.setSpell(e.target.value + " Rush");
				}
				else{
					this.props.setSpell(e.target.value + " " + spellObj.tier)
				}
			}
		}
	}

	handleSetTier(e){

		var spellObj = new SpellBook().tierObject(this.props.player.spell)
		console.log(e.target.value)
		console.log(spellObj)
		//this is really ugly too!!!
		if(e.target.checked){
			if (['Strike', 'Bolt', 'Blast', 'Wave', 'Surge'].includes(e.target.value)){
				if(spellObj.spellBook != "standard"){
					this.props.setSpell("Wind " + e.target.value);
				}
				else{
					this.props.setSpell(spellObj.element + " " + e.target.value);
				}
			}

			else if(['Rush', 'Burst', 'Blitz', 'Barrage'].includes(e.target.value)){
				if(spellObj.spellBook != "ancient"){
					this.props.setSpell("Smoke " + e.target.value);
				}
				else{
					this.props.setSpell(spellObj.element + " " + e.target.value)
				}
			}
		}
	}

	handleSpecialSpell(e){
		if(e.target.checked){
			this.props.setSpell(e.target.value)
		}
	}

	handleClearSpell(e){
		if(e.target.checked){
			this.props.clearSpell()
		}
	}


	render(){
		var spellObj = new SpellBook().tierObject(this.props.player.spell)

		var spellSelect = ['standard', 'ancient', 'special'].map((bookType) => {
			return (
				<div>
					<input
						type="radio"
						name="spellbook-select"
						id={"spellbook-select-" + bookType}
						onChange={this.handleChangeBook}
						value={bookType}
						checked={this.state.spellBook == bookType} 
					/>
					<label for={"spellbook-select-" + bookType}>
						{bookType.charAt(0).toUpperCase() + bookType.slice(1)}
					</label>
				</div>
			)
		})

		var standardElements = ['Wind', 'Water', 'Earth', 'Fire'].map((element) => {
			return (
				<div>
					<input type="radio" id={"element-"+element} checked={spellObj.element == element} value={element} onChange={this.handleSetElement} />
					<label for={"element-"+element}>{element}</label>
				</div>
			)
		})

		standardElements = (
			<div>
				<h3>Elements</h3>
				{standardElements}
			</div>
			)

		var standardTiers = ['Strike', 'Bolt', 'Blast', 'Wave', 'Surge'].map((tier) => {
			return (
				<div>
					<input type="radio" id={"tier-"+tier} checked={spellObj.tier == tier} value={tier} onChange={this.handleSetTier} />
					<label for={"tier-"+tier}>{tier}</label>
				</div>
			)
		})

		standardTiers = (
			<div>
				<h3>Tiers</h3>
				{standardTiers}
			</div>
			)

		var ancientElements = ['Smoke', 'Shadow', 'Blood', 'Ice'].map((element) => {
			return (
				<div>
					<input type="radio" id={"element-"+element} checked={spellObj.element == element} value={element} onChange={this.handleSetElement} />
					<label for={"element-"+element}>{element}</label>
				</div>
			)
		})

		ancientElements = (
			<div>
				<h3>Elements</h3>
				{ancientElements}
			</div>
			)

		var ancientTiers = ['Rush', 'Burst', 'Blitz', 'Barrage'].map((tier) => {
			return (
				<div>
					<input type="radio" id={"tier-"+tier} checked={spellObj.tier == tier} value={tier} onChange={this.handleSetTier} />
					<label for={"tier-"+tier}>{tier}</label>
				</div>
			)
		})

		ancientTiers = (
			<div>
				<h3>Tiers</h3>
				{ancientTiers}
			</div>
			)

		var specialMenu = ['Iban Blast', 'Magic Dart', 'Saradomin Strike', 'Flames of Zamorak', 'Claws of Guthix'].map((spell) => {
			return (
				<div>
					<input type="radio" id={"special-spell-"+spell} checked={spellObj.special == spell} value={spell} onChange={this.handleSpecialSpell} />
					<label for={"special-spell-"+spell}>{spell}</label>
				</div>
				)
		})

		specialMenu = (
			<div>
				<h3>Spells</h3>
				{specialMenu}
			</div>
			)

		var charge = (
			<div>
				<input type='checkbox' id="select-toggle-charge" checked={this.props.player.charge} onChange={this.props.toggleCharge} /><label for="select-toggle-charge">Charge</label>
			</div>
			)

		return (
			<div class="highlight-section flex-container-vertical">
				<div>
					<h3>Type</h3>
					{spellSelect}
				</div>
				{this.state.spellBook == "standard" ? standardElements : ""}
				{this.state.spellBook == "standard" ? standardTiers : ""}
				{this.state.spellBook == "ancient" ? ancientElements : ""}
				{this.state.spellBook == "ancient" ? ancientTiers : ""}
				{this.state.spellBook == "special" ? specialMenu : ""}
				{this.state.spellBook == "special" ? charge : ""}
				<div>
					<input type="radio" id="select-no-spells" checked={this.props.player.spell === null} onChange={this.handleClearSpell} /><label for="select-no-spells">No Spells</label>
				</div>
			</div>
			)
	}
}
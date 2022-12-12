import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeFiliere = this.onChangeFiliere.bind(this);
    this.onChangeAnnee = this.onChangeAnnee.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      nom: "",
      prenom: "", 
      filiere: "",
      annee: "",

      submitted: false
    };
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }

  onChangeFiliere(e) {
    this.setState({
      filiere: e.target.value
    });
  }

  onChangeAnnee(e) {
    this.setState({
      annee: e.target.value
    });
  }
  saveTutorial() {
    var data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      filiere: this.state.filiere,
      annee: this.state.annee
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nom: response.data.nom,
          prenom: response.data.prenom,
          filiere: response.data.filiere,
          annee: response.data.annee,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      nom: "",
      prenom: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nom</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.nom}
                onChange={this.onChangeNom}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Prenom</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.prenom}
                onChange={this.onChangePrenom}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">filiere</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.filiere}
                onChange={this.onChangeFiliere}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Annee</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.annee}
                onChange={this.onChangeAnnee}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

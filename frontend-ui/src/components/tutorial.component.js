import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeFiliere = this.onChangeFiliere.bind(this);
    this.onChangeAnnee = this.onChangeAnnee.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        iid: null,
        nom: "",
        prenom: "", 
        filiere: "",
        annee: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          nom: nom
        }
      };
    });
  }

  onChangePrenom(e) {
    const prenom = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        prenom: prenom
      }
    }));
  }

  onChangeFiliere(e) {
    const filiere = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        filiere: filiere
      }
    }));
  }

  onChangeAnnee(e) {
    const annee = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        annee: annee
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Etudiant</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.nom}
                  onChange={this.onChangeNom}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.prenom}
                  onChange={this.onChangePrenom}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">filiere</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.filiere}
                  onChange={this.onChangeFiliere}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">annee</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.annee}
                  onChange={this.onChangeAnnee}
                />
              </div>

              
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

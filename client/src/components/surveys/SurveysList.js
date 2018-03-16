import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveysList extends React.Component {
    componentDidMount(){
        this.props.fetchSurveysList();
    }
    renderSurveys(){
        return this.props.surveysList.reverse().map(survey => {
            return (
              <div className="card darken-1" key={survey._id}>
                <div className="card-content">
                  <span className="card-title">{survey.title}</span>
                  <p>
                    {survey.body}
                  </p>
                  <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                  <a>Yes: {survey.yes}</a>
                  <a>No: {survey.no}</a>
                </div>
              </div>
            );
          });
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }

}

function mapStateToProps({ surveysList }) {
    return {
        surveysList
    }
}

export default connect(mapStateToProps, actions)(SurveysList);
import React, { Component } from "react";
import { fetchQuestion } from "../../services/fetchQuestion";
import { updateQuestion } from "../../services/updateQuestion";
import { createQuestion } from "../../services/createQuestion";
import StackList from "../StackList";
import "./styles.scss";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import QuestionDetails from "../QuestionDetails/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      searchWord: "",
    };
  }

  componentDidMount = () => {
    this.getQuestion();
  };

  getQuestion = () => {
    fetchQuestion().then((data) => {
      this.setState({
        dataQuestion: data,
      });
    });
  };

  createNewQuestion = (question) => {
    createQuestion(question).then((questionData) => {
      const newArrQuestions = [...this.state.dataQuestion];
      newArrQuestions.push(questionData);
      this.setState({ dataQuestion: newArrQuestions });
    });
  };

  updateQuestionAnswer = (question) => {
    updateQuestion(question)
      .then((updatedQuestion) => {
        const newQuestionsArr = [...this.state.dataQuestion];
        const index = newQuestionsArr.findIndex(
          (question) => question.id === updatedQuestion.id
        );
        newQuestionsArr[index] = updatedQuestion;
        this.setState({ dataQuestion: newQuestionsArr });
      })
      .catch((error) => console.error("Error:", error));
  };

  handleInputValue = (event) => {
    const searchWord = event.currentTarget.value;
    this.setState({
      searchWord: searchWord,
    });
  };

  resetFilter = () => {
    this.setState({ searchWord: "" });
  };

  render() {
    const { dataQuestion, searchWord } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/questions"
            render={() => (
              <StackList
                dataQuestion={dataQuestion}
                handleInputValue={this.handleInputValue}
                searchWord={searchWord}
                createNewQuestion={this.createNewQuestion}
                resetFilter={this.resetFilter}
              />
            )}
          />
          <Route
            exact
            path="/question/:id"
            render={(routeProps) => (
              <QuestionDetails
                id={routeProps.match.params.id}
                dataQuestion={dataQuestion}
                updateQuestion={this.updateQuestionAnswer}
              />
            )}
          />
          <Redirect from="/" to="/questions" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

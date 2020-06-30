import React, { Component } from "react";
import "./styles.scss";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import PropTypes from "prop-types";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4595cb",
    },
    secondary: {
      main: "#777777",
    },
  },
});

class ModalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuestion: {
        question: "",
        content: "",
        tags: "",
        author: "",
      },
      error: {
        question: false,
        content: false,
        tags: false,
        author: false,
      },
    };
  }

  handleChange = (inputInfo) => (event) => {
    const inputValue = event.target.value;
    this.setState((prevState) => {
      const newQuestion = {
        ...prevState.createQuestion,
        [inputInfo]: inputValue,
      };
      const newError = {
        ...prevState.error,
        [inputInfo]: inputValue ? false : true,
      };
      return { error: newError, createQuestion: newQuestion };
    });
  };

  sendQuestion = () => {
    const newQuestion = {
      ...this.state.createQuestion,
      answers: [],
      date: moment().format("YYYY-MM-DDTHH:mm:ss"),
      id: this.props.arrLength + 1,
    };
    this.props.createNewQuestion(newQuestion);
    this.setState(
      {
        createQuestion: {
          question: "",
          content: "",
          tags: "",
          author: "",
        },
        error: {
          question: false,
          content: false,
          tags: false,
          author: false,
        },
      },
      () => window.scrollTo(0, 0)
    );
    this.props.dialogueFunction();
    this.props.resetFilter();
  };

  render() {
    const {
      createQuestion: { question, content, tags, author },
      error,
    } = this.state;
    const { dialogueFunction } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Dialog open={true} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" className="dialog__title">
            Add a new Question
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              onChange={this.handleChange("author")}
              value={author}
              required
              label="Username"
              error={error.author}
              helperText={error.author ? "Please fill in this field" : ""}
              fullWidth
            />
            <TextField
              margin="normal"
              onChange={this.handleChange("tags")}
              value={tags}
              required
              label="Tags"
              error={error.tags}
              helperText={
                error.tags
                  ? "Please fill in this field"
                  : "Enter the label seperated by commas"
              }
              fullWidth
            />
            <TextField
              margin="normal"
              onChange={this.handleChange("question")}
              value={question}
              required
              label="Title Question"
              error={error.question}
              helperText={error.question ? "Please fill in this field" : ""}
              fullWidth
            />
            <TextField
              margin="normal"
              onChange={this.handleChange("content")}
              value={content}
              required
              label="Details Question"
              error={error.content}
              helperText={error.content ? "Please fill in this field" : ""}
              fullWidth
              multiline
              rows="7"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="cancel__btn"
              color="secondary"
              onClick={dialogueFunction}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="accept__btn"
              color="primary"
              disabled={!question || !content || !tags || !author}
              onClick={this.sendQuestion}
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}

ModalInfo.propTypes = {
  arrLength: PropTypes.number,
  createNewQuestion: PropTypes.func,
  dialogueFunction: PropTypes.func,
};

export default ModalInfo;

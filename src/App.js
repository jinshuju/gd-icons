import React from "react";
import styled from "styled-components";
import * as icons from "./icons";
import Header from "./components/Header";
import IconWrapper from "./components/IconWrapper";
import QuickSearch from "./components/QuickSearch";

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: stretch;
  align-items: stretch;
  margin: 0;
  padding: 0 0 50px 0;
  list-style: none;
`;

const MessageWrapper = styled.div`
  display: block;
  width: 100px;
  background: #5FCC6A;
  color: #2c3e50;
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 7px;
  text-align: center;
  border-radius: 2px;
`;

class List extends React.Component {
  onSearch(keyWord) {
    this.setState({ keyWord });
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = { keyWord: "", copySuccess: false };
  }

  render() {
    return (
      <div>
        {this.state.copySuccess && <MessageWrapper>复制成功!</MessageWrapper>}
        <Header />
        <QuickSearch onSearch={this.onSearch} />
        <Container>
          {Object.keys(icons).map((key, index) => {
            const Icon = icons[key];

            if (this.state.keyWord) {
              if (key.toLowerCase().indexOf(this.state.keyWord) === -1) {
                return null;
              }
            }
            return (
              <li
                key={index}
                onDoubleClick={() => {
                  handleCopyIcon(key);
                  this.setState({ copySuccess: true }, () => {
                    setTimeout(() => {
                      this.setState({ copySuccess: false });
                    }, 1000);
                  });
                }}
              >
                <IconWrapper>
                  <Icon />
                  <span>{key}</span>
                </IconWrapper>
              </li>
            );
          })}
        </Container>
      </div>
    );
  }
}

// copy icon
function handleCopyIcon(str) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export default List;

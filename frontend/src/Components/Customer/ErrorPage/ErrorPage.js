import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1800px;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
  display: flex;
 
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ErrorPage = ({ isOpen, onClose, children }) => {
  if (!true) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <ErrorMessage></ErrorMessage>
      </ModalContent>
    </ModalOverlay>
  );
};
const ErrorMessage = () => {
    const errorMessage = `Compiled with problems:
  ×
  ERROR in ./src/Components/Customer/Dashboard/CustomerOrdersPage.js
  Module build failed (from ./node_modules/babel-loader/lib/index.js):
  SyntaxError: /Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/src/Components/Customer/Dashboard/CustomerDashboardPage.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (64:12)
  ...
  [eslint] 
  src/Components/Customer/Dashboard/CustomerDashboardPage.js
    Line 64:12:  Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (64:12)
    at constructor (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:356:19)
    at FlowParserMixin.raise (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:3223:19)
    at FlowParserMixin.jsxParseElementAt (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:6906:18)
    at FlowParserMixin.jsxParseElement (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:6915:17)
    at FlowParserMixin.parseExprAtom (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:6927:19)
    at FlowParserMixin.parseExprSubscripts (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10857:23)
    at FlowParserMixin.parseUpdate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10840:21)
    at FlowParserMixin.parseMaybeUnary (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10816:23)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10654:61)
    at FlowParserMixin.parseExprOps (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10659:23)
    at FlowParserMixin.parseMaybeConditional (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10636:23)
    at FlowParserMixin.parseMaybeAssign (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10597:21)
    at /Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5700:39
    at FlowParserMixin.tryParse (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:3592:20)
    at FlowParserMixin.parseMaybeAssign (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5700:18)
    at FlowParserMixin.parseFunctionBody (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:11928:24)
    at /Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5062:63
    at FlowParserMixin.forwardNoArrowParamsConversionAt (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5240:16)
    at FlowParserMixin.parseFunctionBody (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5062:12)
    at FlowParserMixin.parseArrowExpression (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:11910:10)
    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:11511:12)
    at FlowParserMixin.parseParenAndDistinguishExpression (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5799:18)
    at FlowParserMixin.parseExprAtom (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:11137:23)
    at FlowParserMixin.parseExprAtom (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:6932:20)
    at FlowParserMixin.parseExprSubscripts (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10857:23)
    at FlowParserMixin.parseUpdate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10840:21)
    at FlowParserMixin.parseMaybeUnary (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10816:23)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10654:61)
    at FlowParserMixin.parseExprOps (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10659:23)
    at FlowParserMixin.parseMaybeConditional (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10636:23)
    at FlowParserMixin.parseMaybeAssign (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10597:21)
    at FlowParserMixin.parseMaybeAssign (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5755:18)
    at /Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10567:39
    at FlowParserMixin.allowInAnd (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:12284:12)
    at FlowParserMixin.parseMaybeAssignAllowIn (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10567:17)
    at FlowParserMixin.parseExprListItem (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:12020:18)
    at FlowParserMixin.parseCallExpressionArguments (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:11054:22)
    at FlowParserMixin.parseCoverCallAndAsyncArrowHead (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10964:29)
    at FlowParserMixin.parseSubscript (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10899:19)
    at FlowParserMixin.parseSubscript (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5858:18)
    at FlowParserMixin.parseSubscripts (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10870:19)
    at FlowParserMixin.parseSubscripts (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:5824:18)
    at FlowParserMixin.parseExprSubscripts (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10861:17)
    at FlowParserMixin.parseUpdate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10840:21)
    at FlowParserMixin.parseMaybeUnary (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10816:23)
    at FlowParserMixin.parseMaybeUnaryOrPrivate (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10654:61)
    at FlowParserMixin.parseExprOps (/Users/saikrishnapydeti/coding/projects/Ecommerce/frontend/node_modules/@babel/parser/lib/index.js:10659:23)
    at FlowParserMixin.parseMaybeConditional 
    `;
  
    return (
      <div>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
    );
  };
export default ErrorPage;

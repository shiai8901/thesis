import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';

import ClaimButton from '../client/Components/ClaimQuestionButton';
import QuestionItem from '../client/Components/QuestionItem';

describe("QuestionItem component", function() {

  it("QuestionItem should have checkUserAuth method passed down from App.js", function() {
    // expect(shallow(<QuestionItem />).find('').length).to.equal(2);
  });

  it("Only logged in users can see claim buttons", function() {
    // expect(shallow(<QuestionItem />).find('').length).to.equal(2);
  });

  it("User should not be able to claim his own question", function() {
    // expect(shallow(<QuestionItem />).find('').length).to.equal(2);
  });  


  // it("contains a Ace editor", function() {
		// const wrapper = shallow(<div id="editor" />);
		// expect(wrapper.is('#editor')).to.equal(true);

  // });

  // it("contains a area for result", function() {
		// const wrapper = shallow(<div id="result" />);
		// expect(wrapper.is('#result')).to.equal(true);
  // });
});
import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";

// Note how with shallow render you search for the React component tag
describe('<Header />', () => {
  it("renders", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});

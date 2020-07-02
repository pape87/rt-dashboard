import React from "react";
import CountryStats from "./CountryStats";
import { Download } from "../../store/download";
import { render } from "@testing-library/react";


describe("The component <CountryStats>", () => {
  const initialProps: { downloads: Download[] } = {
    downloads: [
      { country: "Italy", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "France", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Italy", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Germany", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "France", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Spain", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Spain", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Spain", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Spain", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" },
      { country: "Italy", app_id: "", longitude: 0, latitude: 0, downloaded_at: "" }
    ]
  }

  it("should display the correct amount of countries", () => {
    const wrapper = render(<CountryStats {...initialProps} />);
    const listItem = wrapper.getAllByTestId("coutry-list-item");
    expect(listItem.length).toEqual(4);
  });

  it("should display the countries by download in descending order", () => {
    const wrapper = render(<CountryStats {...initialProps} />);
    const listItem = wrapper.getAllByTestId("coutry-list-item");
    expect(listItem[0].innerHTML).toEqual("Spain - 4");
    expect(listItem[1].innerHTML).toEqual("Italy - 3");
    expect(listItem[2].innerHTML).toEqual("France - 2");
    expect(listItem[3].innerHTML).toEqual("Germany - 1");
  });
});

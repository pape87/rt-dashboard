import React from 'react';
import TimeStats from "./TimeStats";
import { Download } from '../../store/download';
import { render } from '@testing-library/react';


describe("The component <CountryStats>", () => {
  const initialProps: { downloads: Download[] } = {
    downloads: [
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 08:32:01 GMT" }, // morning
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 07:32:01 GMT" }, // morning
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 18:32:01 GMT" }, // evening
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 21:32:01 GMT" }, // evening
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 12:32:01 GMT" }, // afternoon
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 11:32:01 GMT" }, // morning
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 09:32:01 GMT" }, // morning
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 00:32:01 GMT" }, // night
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 23:32:01 GMT" }, // evening
      { country: "", app_id: "", longitude: 0, latitude: 0, downloaded_at: "Mon, 29 Jun 2020 15:32:01 GMT" }  // afternoon
    ]
  }

  it('should display the correct amount of times', () => {
    const wrapper = render(<TimeStats {...initialProps} />);
    const listItem = wrapper.getAllByTestId("time-list-item");
    expect(listItem.length).toEqual(4);    
  });

  it('should display the times by download in descending order', () => {
    const wrapper = render(<TimeStats {...initialProps} />);
    const listItem = wrapper.getAllByTestId("time-list-item");
    expect(listItem[0].innerHTML).toEqual("morning - 4");
    expect(listItem[1].innerHTML).toEqual("evening - 3");
    expect(listItem[2].innerHTML).toEqual("afternoon - 2");
    expect(listItem[3].innerHTML).toEqual("night - 1");
  });
});

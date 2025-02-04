import TooltipChartBase from "../TooltipChartBase";

describe("TooltipChartBase", () => {
  it("should generate the correct HTML tooltip markup", () => {
    const data = [
      { title: "Item 1", value: 42 },
      { title: "Item 2", value: "Hello" },
      { title: "Item 3", value: true },
    ];

    const expectedMarkup = `
<div style="padding: 8px 16px; border-radius: 2px; background: #FFFFFF;">
    
  <div style="display: flex; justify-content: space-between;">
    <p style="font-weight: 600; color: #8C8F93; margin: 6px 12px 6px 0px;">
      Item 1 :
    </p>
    <p style="font-weight: 600; margin: 6px 0px; color: #000">42</p>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <p style="font-weight: 600; color: #8C8F93; margin: 6px 12px 6px 0px;">
      Item 2 :
    </p>
    <p style="font-weight: 600; margin: 6px 0px; color: #000">Hello</p>
  </div>

  <div style="display: flex; justify-content: space-between;">
    <p style="font-weight: 600; color: #8C8F93; margin: 6px 12px 6px 0px;">
      Item 3 :
    </p>
    <p style="font-weight: 600; margin: 6px 0px; color: #000">true</p>
  </div>

  </div>
    `.trim();

    const generatedMarkup = TooltipChartBase(data).trim();

    expect(generatedMarkup).toEqual(expectedMarkup);
  });
});

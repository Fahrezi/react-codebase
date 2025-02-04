const TooltipChartBase = (data: { title: string; value: any }[]) => {
  const dataHtml = data
    .map(
      (item: any) => `
  <div style="display: flex; justify-content: space-between;">
    <p style="font-weight: 600; color: #8C8F93; margin: 6px 12px 6px 0px;">
      ${item.title} :
    </p>
    <p style="font-weight: 600; margin: 6px 0px; color: #000">${item.value}</p>
  </div>
`
    )
    .join("");

  return `
  <div style="padding: 8px 16px; border-radius: 2px; background: #FFFFFF;">
    ${dataHtml}
  </div>`;
};

export default TooltipChartBase;

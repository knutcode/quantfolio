import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import noDataToDisplay from 'highcharts/modules/no-data-to-display';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

noDataToDisplay(Highcharts);

Highcharts.setOptions({
	lang: { rangeSelectorZoom: '' },
	accessibility: { enabled: false },
});

Highcharts.seriesTypes.line.prototype.drawLegendSymbol = Highcharts.seriesTypes.column.prototype.drawLegendSymbol;

let seriesData = [];

export const Chart = (props) => {
	const [options, setOptions] = useState({
		chart: {
			zoomType: 'x',
		},

		lang: {
			noData: 'Loading stockdata...',
		},
		noData: {
			style: {
				fontWeight: 'bold',
				fontSize: '18px',
				color: 'teal',
			},
		},

		navigator: {
			enabled: false,
		},

		rangeSelector: {
			buttons: [
				{
					type: 'year',
					count: 1,
					text: '1Y',
				},
				{
					type: 'year',
					count: 5,
					text: '5Y',
				},
				{
					type: 'all',
					text: 'MAX',
				},
			],
			selected: 2, // all
		},

		scrollbar: {
			enabled: false,
		},

		xAxis: {
			title: {
				text: 'Time',
			},
		},

		yAxis: {
			opposite: false,
			title: {
				text: 'Value',
			},
			labels: {
				formatter: function () {
					return '$' + this.value;
				},
			},
		},

		legend: {
			enabled: true,
			align: 'center',
			verticalAlign: 'bottom',
			x: 0,
			y: 0,
		},

		tooltip: {
			borderWidth: 0,
			split: false,
			sticky: false,
			valuePrefix: '$',
			valueSuffix: ' USD',
			valueDecimals: 2,
		},

		plotOptions: {
			series: {
				marker: {
					enabled: false,
					symbol: 'circle',
				},
				stickyTracking: false,
			},
		},

		credits: {
			enabled: false,
		},
	});

	useEffect(() => {
		axios
			.get('https://stockdata.test.quantfolio.dev/ticker')
			.then((res) => {
				const endpoints = res.data.tickers.map((ticker) => {
					return `https://stockdata.test.quantfolio.dev/ticker/${ticker}`;
				});
				return endpoints;
			})
			.then((endpoints) => {
				Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
					.then(
						axios.spread((...allData) => {
							return allData;
						})
					)
					.then((allData) => {
						allData.forEach((stock) => {
							const reversed = stock.data.values
								.map((element) => {
									return [Date.parse(element.datetime), parseFloat(element.open)];
								})
								.reverse();

							seriesData.push({
								name: stock.data.meta.symbol,
								data: reversed,
							});
						});
						setOptions({
							...options,
							series: seriesData,
						});
					});
			});
	}, []);

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			constructorType={'stockChart'}
			containerProps={{ className: props.className }}
		/>
	);
};

export const HighChartWrapper = styled(Chart)`
	width: 100%;
	flex: 1;
	padding: 5rem;
`;

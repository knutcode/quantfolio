import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { Main } from './Styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

		legend: {
			enabled: true,
			align: 'center',
			verticalAlign: 'bottom',
			x: 0,
			y: 0,
		},

		tooltip: {
			borderWidth: 0,
		},

		plotOptions: {
			series: {
				marker: {
					enabled: false,
					symbol: 'circle',
				},
			},
		},

		series: [
			{
				// name: '',
				data: [],
			},
		],

		credits: {
			enabled: false,
		},
	});

	useEffect(() => {
		axios.get('https://stockdata.test.quantfolio.dev/ticker').then((res) => {
			res.data.tickers.forEach((e) => {
				axios
					.get(`https://stockdata.test.quantfolio.dev/ticker/${e}`)
					.then((res) => {
						const reversed = res.data.values
							.map((element) => {
								return [Date.parse(element.datetime), parseFloat(element.open)];
							})
							.reverse();
						seriesData.push({ name: `${res.data.meta.symbol}`, data: reversed });
					})
					.then(() => {
						setOptions({
							...options,
							series: seriesData,
						});
					});
			});
		});
	}, []);

	return (
		<Main>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				constructorType={'stockChart'}
				containerProps={{ className: props.className }}
			/>
		</Main>
	);
};

export const HighChartWrapper = styled(Chart)`
	/* .highcharts-plot-border {
		fill: black !important;
	} */
	width: min(100%, 100rem);
`;

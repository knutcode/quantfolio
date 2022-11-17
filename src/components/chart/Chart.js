import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { Main } from './Styles';

Highcharts.setOptions({
	time: {
		timezone: 'Europe/Oslo',
	},
});

export const Chart = (props) => {
	const rngNum = () => {
		return Math.random() * 200;
	};
	const options = {
		chart: {},

		navigator: {
			enabled: false,
		},

		rangeSelector: {
			selected: 2,
		},

		scrollbar: {
			enabled: false,
		},

		legend: {
			enabled: true,
			align: 'center',
			verticalAlign: 'bottom',
			layout: 'vertical',
			x: 0,
			y: 0,
		},

		tooltip: {
			borderWidth: 0,
		},

		xAxis: {
			type: 'datetime',
		},

		time: {
			timezone: 'Europe/London',
		},

		plotOptions: {
			series: {
				marker: {
					enabled: false,
				},
			},
		},

		series: [
			{
				name: 'Stock 1',
				data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
				pointStart: Date.UTC(2016, 9, 22),
				pointIntervalUnit: 'month',
			},
			{
				name: 'Stock 2',
				data: [29.9, 55, 106.4, 135.2, 144.0, 191.0, 120.6, 148.5, 190.4, 194.1, 50, 54.4],
				pointStart: Date.UTC(2016, 9, 22),
				pointIntervalUnit: 'month',
			},
			{
				name: 'Stock 3',
				data: [rngNum(), rngNum(), rngNum(), rngNum(), rngNum(), rngNum(), rngNum(), rngNum()],
				pointStart: Date.UTC(2016, 9, 22),
				pointIntervalUnit: 'month',
			},
		],

		credits: {
			enabled: false,
		},
	};

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

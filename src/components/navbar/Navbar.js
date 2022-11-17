import { Logo, LogoWrapper, Nav } from './Styles';
import MainLogo from '../../img/LogoBlackH70.png';

export const Navbar = () => {
	return (
		<Nav>
			<LogoWrapper>
				<a href="https://www.quantfol.io/">
					<Logo src={MainLogo} />
				</a>
			</LogoWrapper>
		</Nav>
	);
};

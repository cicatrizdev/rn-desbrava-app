import { Appbar } from 'react-native-paper';
import { colors } from '../../styles/colors';

interface AppHeaderProps {
	title: string;
	icon?: string;
	onPress?: () => void;
}

const AppHeader = ({ title, icon, onPress }: AppHeaderProps) => {
	return (
		<Appbar.Header style={{ backgroundColor: colors.black }}>
			<Appbar.Content color={colors.onSurface} title={title} />
			{icon && <Appbar.Action color={colors.onSurface} icon={icon} onPress={onPress} />}
		</Appbar.Header>
	);
};

export default AppHeader;

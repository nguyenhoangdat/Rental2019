import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { SignInApi, Statistical } from '../APIs/API';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
class PieChartWithCenteredLabels extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = ({
            name: 'Chọn bất động sản',
            SumSubProperty: '',
            NumberEmptyPropert: '',
            Subproperty:'',
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.navigation !== this.props.navigation) {
            const { navigation } = this.props;
            let userid = navigation.getParam('UserID');
            let id = navigation.getParam('ID');
            name = navigation.getParam('Name');
            if (name !== this.state.name) {
                this.setState({ name });
            }
            SumSubProperty = '';
            NumberEmptyPropert = '';
            if (prevProps.SumSubProperty !== this.state.SumSubProperty) {
            this.setState({ SumSubProperty })
            }
            if (prevProps.NumberEmptyPropert !== this.state.NumberEmptyPropert) {
            this.setState({ NumberEmptyPropert })
            }
            Statistical(userid, id).then(res => {
                let obj = JSON.parse(res);
                 SumSubProperty = obj.SumSubProperty;
                 NumberEmptyPropert = obj.NumberEmptyPropert;
                if (prevProps.SumSubProperty !== this.state.SumSubProperty) {
                    this.setState({ SumSubProperty })
                }
                if (prevProps.NumberEmptyPropert !== this.state.NumberEmptyPropert) {
                    this.setState({ NumberEmptyPropert })
                }
                Subproperty = SumSubProperty - NumberEmptyPropert;
                if (prevProps.Subproperty !== this.state.Subproperty) {
                this.setState({Subproperty});
                }
                if(Subproperty==0){
                    Subproperty='';
                    this.setState({Subproperty});
                }
                if(NumberEmptyPropert==0){
                    NumberEmptyPropert='';
                    this.setState({NumberEmptyPropert});
                }
            }
            );
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        let userid = navigation.getParam('UserID');
        let id = navigation.getParam('ID');
        name = navigation.getParam('Name');
        if (name !== this.state.name) {
            this.setState({ name });
        }
        Statistical(userid, id).then(res => {
            let obj = JSON.parse(res);
            SumSubProperty = obj.SumSubProperty;
            NumberEmptyPropert = obj.NumberEmptyPropert;
            this.setState({ SumSubProperty })
            this.setState({ NumberEmptyPropert })
            Subproperty = SumSubProperty - NumberEmptyPropert;
            this.setState({Subproperty});
            if(Subproperty==0){
                Subproperty='';
                this.setState({Subproperty});
            }
            if(NumberEmptyPropert==0){
                NumberEmptyPropert='';
                this.setState({NumberEmptyPropert});
            }
        }
        );
    }
    render() {
        const { navigation } = this.props;
        name = navigation.getParam('Name');
        const data = [
            {
                key: 1,
                amount: this.state.Subproperty,
                svg: { fill: '#87CEFA' },
            },
            {
                key: 2,
                amount: this.state.NumberEmptyPropert,
                svg: { fill: '#4682B4' }
            },
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 250 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels />
            </PieChart>
        )
    }

}

export default PieChartWithCenteredLabels
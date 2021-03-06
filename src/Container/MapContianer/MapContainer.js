import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import { KEY_MAP } from "../../config/key"
Geocode.setApiKey(KEY_MAP)
export class MapContainer extends Component {
    state = {
        lat: null,
        lng: null,
        toRender: false,
        selectedCompany: this.props.selected,

        nameOfCompany: this.props.selected.CompanyName
    }
    componentWillReceiveProps(nextProps) {
       
        if ( this.state.selectedCompany.Address!== nextProps.selected.Address) {
            this.updateMap()
        }
    }
    updateMap = () => {
      
        this.setState({ toRender: false }, () => {

        })
        this.setState({
            selectedCompany: this.props.selected,

            nameOfCompany: this.props.selected.CompanyName
        }, () => {
            Geocode.fromAddress(`${this.props.selected.Address}
        ${this.props.selected.City}
         ${this.props.selected.Country}`).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({ lat: lat, lng: lng }, () => {
                        this.setState({ toRender: true })

                    })
                },
                error => {
                    this.setState({ toRender: false })
                }
            );
        })
    }
    componentDidMount() {
        Geocode.fromAddress(`${this.state.selectedCompany.Address}
         ${this.state.selectedCompany.City}
          ${this.state.selectedCompany.Country}`).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ lat: lat, lng: lng, toRender: true })
            },
            error => {
                this.setState({ toRender: false })
            }
        );
    }


    render() {

        return (
            <div style={{ bottom: "200" }}>
                {this.state.toRender && (<Map google={this.props.google}
                    initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                    zoom={13}>
                    <Marker
                     
                        title={this.props.selected.CompanyName}
                        position={{ lat: this.state.lat, lng: this.state.lng }}
                        name={this.props.selected.CompanyName}
                    />
                    {/* <InfoWindow >
                        <div>
                            <h1>{this.state.selectedCompany.CompanyName}</h1>
                        </div>
                    </InfoWindow> */}
                    {/* <InfoWindow
                        marker={this.state.selectedCompany.CompanyName}
                        visible={false}
                    /> */}
                </Map>)}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (KEY_MAP)
})(MapContainer)
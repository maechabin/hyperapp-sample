import { h, app } from 'hyperapp';

const state = { };
const actions = { };

const view = (state, actions) => (
  <div>
    <GoogleMap google={window.google} />
  </div>
);

const GoogleMap = (props) => {
  const mapOptions = {
    center: new props.google.maps.LatLng(-34.397, 150.644),
    zoom: 12,
    mapTypeId: props.google.maps.MapTypeId.ROADMAP,
  };
  const initMap = (element) => {
    const mapElement = element;
    console.log(mapElement);
    const map = new props.google.maps.Map(mapElement, mapOptions);
  }
  return (
    <div oncreate={elem => initMap(elem)} style={{width: '100%', height: '100vh'}}>google</div>
  );
};

app(state, actions, view, document.querySelector('.content'));

export type TransitLine = {
  id: string;
  name: string;
  color: string;
  textColor?: string;
  path: [number, number][];
};

export type Station = {
  id: string;
  name: string;
  borough: 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx';
  lat: number;
  lng: number;
  lines: string[];
  note: string;
};

export const lines: TransitLine[] = [
  {
    id: '1', name: '1', color: '#EE352E',
    path: [[40.8749,-73.9090],[40.8406,-73.9402],[40.8077,-73.9455],[40.7994,-73.9682],[40.7734,-73.9822],[40.7553,-73.9875],[40.7504,-73.9911],[40.7378,-74.0002],[40.7303,-74.0023],[40.7193,-74.0067],[40.7118,-74.0130]]
  },
  {
    id: 'A', name: 'A', color: '#2850AD',
    path: [[40.8681,-73.9199],[40.8407,-73.9396],[40.8179,-73.9474],[40.8006,-73.9582],[40.7813,-73.9818],[40.7683,-73.9817],[40.7558,-73.9864],[40.7527,-73.9934],[40.7262,-74.0037],[40.7131,-74.0097],[40.6993,-73.9905],[40.6871,-73.9754],[40.6771,-73.9723]]
  },
  {
    id: 'L', name: 'L', color: '#A7A9AC', textColor: '#111',
    path: [[40.7398,-74.0026],[40.7373,-73.9968],[40.7347,-73.9907],[40.7309,-73.9817],[40.7142,-73.9504],[40.7108,-73.9578],[40.7087,-73.9588],[40.7062,-73.9331],[40.6975,-73.9135]]
  },
  {
    id: '7', name: '7', color: '#B933AD',
    path: [[40.7547,-73.9868],[40.7554,-73.9783],[40.7518,-73.9769],[40.7470,-73.9453],[40.7468,-73.8914],[40.7499,-73.8627],[40.7596,-73.8300]]
  },
  {
    id: 'N', name: 'N', color: '#FCCC0A', textColor: '#111',
    path: [[40.7648,-73.9807],[40.7587,-73.9813],[40.7547,-73.9868],[40.7504,-73.9911],[40.7359,-73.9905],[40.7188,-74.0002],[40.7062,-74.0090],[40.6904,-73.9818],[40.6773,-73.9832]]
  }
];

export const stations: Station[] = [
  { id:'times', name:'Times Sq–42 St', borough:'Manhattan', lat:40.7550, lng:-73.9876, lines:['1','7','N'], note:'Major Midtown transfer hub' },
  { id:'union', name:'14 St–Union Sq', borough:'Manhattan', lat:40.7358, lng:-73.9904, lines:['L','N'], note:'Downtown transfer & Union Square' },
  { id:'columbus', name:'59 St–Columbus Circle', borough:'Manhattan', lat:40.7683, lng:-73.9819, lines:['1','A'], note:'Central Park southwest entrance' },
  { id:'fulton', name:'Fulton St', borough:'Manhattan', lat:40.7104, lng:-74.0074, lines:['A'], note:'Financial District connection' },
  { id:'w4', name:'W 4 St–Washington Sq', borough:'Manhattan', lat:40.7323, lng:-74.0005, lines:['A'], note:'Greenwich Village' },
  { id:'bedford', name:'Bedford Av', borough:'Brooklyn', lat:40.7173, lng:-73.9569, lines:['L'], note:'Williamsburg' },
  { id:'atlantic', name:'Atlantic Av–Barclays Ctr', borough:'Brooklyn', lat:40.6845, lng:-73.9777, lines:['N'], note:'Barclays Center & LIRR nearby' },
  { id:'qboro', name:'Queensboro Plaza', borough:'Queens', lat:40.7506, lng:-73.9402, lines:['7','N'], note:'Queens transfer hub' },
  { id:'flushing', name:'Flushing–Main St', borough:'Queens', lat:40.7596, lng:-73.8300, lines:['7'], note:'Eastern terminal of the 7' },
  { id:'125', name:'125 St', borough:'Manhattan', lat:40.8111, lng:-73.9523, lines:['A'], note:'Harlem' },
  { id:'168', name:'168 St', borough:'Manhattan', lat:40.8407, lng:-73.9396, lines:['1','A'], note:'Washington Heights transfer' },
  { id:'southferry', name:'South Ferry', borough:'Manhattan', lat:40.7021, lng:-74.0134, lines:['1'], note:'Battery Park & Staten Island Ferry' }
];

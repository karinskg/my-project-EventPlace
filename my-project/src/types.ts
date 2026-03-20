export interface eventArray {
  id: number;
  date: string;
  title: string;
  time: string;
  other: string;
}

export interface WeatherHours {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  }
  [key: string]: number | string | any;
}

export interface IWeather{
  location: Location;
  current: Current;
  forecast: Forecast;
}

interface Forecast {
  forecastday: Forecastday[];
}

interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro?: Astro;
  hour: Hour[];
}

interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  short_rad: number;
  diff_rad: number;
  dni: number;
  gti: number;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  short_rad: number;
  diff_rad: number;
  dni: number;
  gti: number;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}



/////commingEvents///////////

export interface IEvents {
  _embedded: Embedded2;
  // _links: Links3;
  // page: Page;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Links3 {
  first: Self;
  self: Self;
  next: Self;
  last: Self;
}

interface Embedded2 {
  events: Event[];
}

export interface Event {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  outlets?: Outlet[];
  seatmap?: Seatmap;
  ticketing?: Ticketing;
  nameOrigin?: string;
  _links: Links;
  _embedded: Embedded;
  promoter?: Promoter;
  promoters?: Promoter[];
  info?: string;
  products?: Product[];
  accessibility?: Accessibility;
  ageRestrictions?: AgeRestrictions;
  pleaseNote?: string;
  ticketLimit?: TicketLimit;
  linkMoreInfo?: LinkMoreInfo;
  doorsTimes?: DoorsTimes;
}

interface DoorsTimes {
  localDate: string;
  localTime: string;
  dateTime: string;
}

interface LinkMoreInfo {
  descriptions: Descriptions;
  url: string;
}

interface Descriptions {
  'en-nz': string;
  'en-ca': string;
  'en-us': string;
  'pt-br': string;
  'en-au': string;
  'es-us': string;
  'es-br': string;
  'en-mx': string;
  'es-mx': string;
  'fr-ca': string;
}

interface TicketLimit {
  info: string;
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
}

interface Accessibility {
  info?: string;
  ticketLimit: number;
}

interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: Classification2[];
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface Embedded {
  venues: Venue[];
  attractions: Attraction[];
}

interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks?: ExternalLinks;
  images: Image2[];
  classifications: Classification2[];
  upcomingEvents: UpcomingEvents2;
  _links: Links2;
  aliases?: string[];
}

interface UpcomingEvents2 {
  tmr?: number;
  ticketmaster?: number;
  _total: number;
  _filtered: number;
  tmc?: number;
}

interface Classification2 {
  primary: boolean;
  segment: Segment;
  genre: Segment;
  subGenre: Segment;
  type: Segment;
  subType: Segment;
  family: boolean;
}

interface Image2 {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
  attribution?: string;
}

interface ExternalLinks {
  twitter: Twitter2[];
  facebook: Twitter2[];
  wiki: Twitter2[];
  instagram: Twitter2[];
  homepage: Twitter2[];
}

interface Twitter2 {
  url: string;
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  locale: string;
  postalCode: string;
  timezone: string;
  city: City;
  state?: State;
  country: Country;
  address: Address;
  location: Location;
  dmas: Dma[];
  upcomingEvents: UpcomingEvents;
  _links: Links2;
  url?: string;
  aliases?: string[];
  images?: Image[];
  markets?: Segment[];
  social?: Social;
  boxOfficeInfo?: BoxOfficeInfo;
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: GeneralInfo;
  ada?: Ada;
}

interface Ada {
  adaPhones: string;
  adaCustomCopy: string;
  adaHours: string;
}

interface GeneralInfo {
  generalRule?: string;
  childRule: string;
}

interface BoxOfficeInfo {
  phoneNumberDetail: string;
  openHoursDetail: string;
  acceptedPaymentDetail?: string;
  willCallDetail?: string;
}

interface Social {
  twitter: Twitter;
}

interface Twitter {
  handle: string;
}

interface Links2 {
  self: Self;
}

interface UpcomingEvents {
  tmr?: number;
  ticketmaster?: number;
  _total: number;
  _filtered: number;
  archtics?: number;
  tmc?: number;
  universe?: number;
}

interface Dma {
  id: number;
}

interface Location {
  longitude: string;
  latitude: string;
}

interface Address {
  line1: string;
}

interface Country {
  name: string;
  countryCode: string;
}

interface State {
  name: string;
  stateCode: string;
}

interface City {
  name: string;
}

interface Links {
  self: Self;
  attractions: Self[];
  venues: Self[];
}

interface Self {
  href: string;
}

interface Ticketing {
  allInclusivePricing: AllInclusivePricing;
  safeTix?: AllInclusivePricing;
}

interface AllInclusivePricing {
  enabled: boolean;
}

interface Seatmap {
  staticUrl: string;
}

interface Outlet {
  url: string;
  type: string;
}

interface Classification {
  primary: boolean;
  segment: Segment;
  genre: Segment;
  subGenre: Segment;
  family: boolean;
  type?: Segment;
  subType?: Segment;
}

interface Segment {
  id: string;
  name: string;
}

interface Dates {
  start: Start;
  status: Status;
  spanMultipleDays: boolean;
  timezone?: string;
}

interface Status {
  code: string;
}

interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Sales {
  public: Public;
  presales?: Presale[];
}

interface Presale {
  startDateTime: string;
  endDateTime: string;
  name: string;
}

interface Public {
  startDateTime?: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime?: string;
}

export interface Image {
  ratio?: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

////////////////

export interface ICartDetail {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  info: string;
  pleaseNote: string;
  products: Product[];
  seatmap: Seatmap;
  accessibility: Accessibility;
  ticketLimit: TicketLimit;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  nameOrigin: string;
  linkMoreInfo: LinkMoreInfo;
  _links: Links;
  _embedded: Embedded;
}

interface Embedded {
  venues: Venue[];
  attractions: Attraction[];
}

interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks: ExternalLinks;
  aliases: string[];
  images: Image[];
  classifications: Classification[];
  upcomingEvents: UpcomingEvents2;
  _links: Links2;
}

interface UpcomingEvents2 {
  ticketmaster: number;
  _total: number;
  _filtered: number;
  tmr?: number;
}

interface ExternalLinks {
  twitter: Twitter[];
  facebook: Twitter[];
  wiki: Twitter[];
  instagram: Twitter[];
  homepage: Twitter[];
}

interface Twitter {
  url: string;
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
  address: Address;
  location: Location;
  markets: Segment[];
  dmas: Dma[];
  boxOfficeInfo: BoxOfficeInfo;
  parkingDetail: string;
  accessibleSeatingDetail: string;
  generalInfo: GeneralInfo;
  upcomingEvents: UpcomingEvents;
  _links: Links2;
}

interface Links2 {
  self: Self;
}

interface UpcomingEvents {
  archtics: number;
  tmr: number;
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

interface GeneralInfo {
  generalRule: string;
  childRule: string;
}

interface BoxOfficeInfo {
  phoneNumberDetail: string;
  openHoursDetail: string;
  acceptedPaymentDetail: string;
  willCallDetail: string;
}

interface Dma {
  id: number;
}

interface Location {
  longitude: string;
  latitude: string;
}

interface Address {
  line1: string;
}

interface Country {
  name: string;
  countryCode: string;
}

interface State {
  name: string;
  stateCode: string;
}

interface City {
  name: string;
}

interface Links {
  self: Self;
  attractions: Self[];
  venues: Self[];
}

interface Self {
  href: string;
}

interface LinkMoreInfo {
  descriptions: Descriptions;
  url: string;
}

interface Descriptions {
  'en-nz': string;
  'en-ca': string;
  'en-us': string;
  'pt-br': string;
  'en-au': string;
  'es-us': string;
  'es-br': string;
  'en-mx': string;
  'es-mx': string;
  'fr-ca': string;
}

interface Ticketing {
  safeTix: SafeTix;
  allInclusivePricing: SafeTix;
}

interface SafeTix {
  enabled: boolean;
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
}

interface TicketLimit {
  info: string;
}

interface Accessibility {
  ticketLimit: number;
}

interface Seatmap {
  staticUrl: string;
}

interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: Classification[];
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface Classification {
  primary: boolean;
  segment: Segment;
  genre: Segment;
  subGenre: Segment;
  type: Segment;
  subType: Segment;
  family: boolean;
}

interface Segment {
  id: string;
  name: string;
}

interface Dates {
  start: Start;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
}

interface Status {
  code: string;
}

interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Sales {
  public: Public;
  presales: Presale[];
}

interface Presale {
  startDateTime: string;
  endDateTime: string;
  name: string;
}

interface Public {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}






/////////////future weather


export interface IFutureWeather {
  location: Location;
  forecast: Forecast;
}

interface Forecast {
  forecastday: Forecastday[];
}

interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro?: Astro;
  hour: Hour[];
}

interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  condition: Condition;
  uv: number;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
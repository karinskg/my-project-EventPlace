export interface eventArray {
  id: string;
  date: string;
  title: string;
  time: string;
  img: string;
  other: string;
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

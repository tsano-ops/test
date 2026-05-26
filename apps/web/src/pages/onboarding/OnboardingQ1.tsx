import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnSubmit from '@/components/ui/BtnSubmit';
import Dropdown from '@/components/ui/Dropdown';

const YEARS = Array.from({ length: 100 }, (_, i) => String(2025 - i));
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador',
  'Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France',
  'Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau',
  'Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait',
  'Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
  'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico',
  'Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru',
  'Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman',
  'Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal',
  'Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia',
  'South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey',
  'Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu',
  'Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

// Countries with different legislation per state/region
const REGIONS_BY_COUNTRY: Record<string, string[]> = {
  'United States': [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
    'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
    'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
    'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
    'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
  ],
  'Canada': [
    'Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador','Nova Scotia',
    'Ontario','Prince Edward Island','Quebec','Saskatchewan','Northwest Territories','Nunavut','Yukon',
  ],
  'Australia': [
    'New South Wales','Victoria','Queensland','South Australia','Western Australia','Tasmania',
    'Australian Capital Territory','Northern Territory',
  ],
  'Germany': [
    'Baden-Württemberg','Bavaria','Berlin','Brandenburg','Bremen','Hamburg','Hesse','Lower Saxony',
    'Mecklenburg-Vorpommern','North Rhine-Westphalia','Rhineland-Palatinate','Saarland','Saxony',
    'Saxony-Anhalt','Schleswig-Holstein','Thuringia',
  ],
  'Switzerland': [
    'Zürich','Bern','Lucerne','Uri','Schwyz','Obwalden','Nidwalden','Glarus','Zug','Fribourg',
    'Solothurn','Basel-Stadt','Basel-Landschaft','Schaffhausen','Appenzell Ausserrhoden','Appenzell Innerrhoden',
    'St. Gallen','Graubünden','Aargau','Thurgau','Ticino','Vaud','Valais','Neuchâtel','Geneva','Jura',
  ],
  'United Kingdom': [
    'England','Scotland','Wales','Northern Ireland',
  ],
  'India': [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
    'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
    'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  ],
  'Brazil': [
    'Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Distrito Federal','Espírito Santo','Goiás',
    'Maranhão','Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco',
    'Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima',
    'Santa Catarina','São Paulo','Sergipe','Tocantins',
  ],
  'Mexico': [
    'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila',
    'Colima','Durango','Guanajuato','Guerrero','Hidalgo','Jalisco','México','Michoacán','Morelos',
    'Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa',
    'Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas','Mexico City',
  ],
  'Spain': [
    'Andalusia','Aragon','Asturias','Balearic Islands','Basque Country','Canary Islands','Cantabria',
    'Castile and León','Castile-La Mancha','Catalonia','Extremadura','Galicia','La Rioja','Madrid',
    'Murcia','Navarre','Valencian Community',
  ],
  'Belgium': [
    'Brussels-Capital Region','Flemish Region','Walloon Region',
  ],
};

export default function OnboardingQ1() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [country, setCountry] = useState('');
  const [stateRegion, setStateRegion] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !birthYear || !birthMonth || !birthDay || !country) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    sessionStorage.setItem('onboarding-q1', JSON.stringify({
      firstName, lastName, nationality, birthYear, birthMonth, birthDay, country, stateRegion,
    }));
    navigate('/onboarding/q2');
  }

  return (
    <div className="onboarding-q-page">
      <div className="onboarding-q-bg" />

      {/* Logo Pill — same as all auth pages */}
      <a href="/" className="auth-logo-pill" style={{ position: 'absolute', zIndex: 3, top: `calc(20px * var(--s))`, left: '50%', transform: 'translateX(-50%)' }}>
        <img src="/icons/planafter-logo.svg" alt="PlanAfter" />
      </a>

      {/* Progress Bar Card */}
      <div className="onboarding-q-progress-card">
        <div className="onboarding-q-progress-header">
          <span className="onboarding-q-progress-label">Your Progress</span>
          <span className="onboarding-q-progress-percent">5<sup>%</sup></span>
        </div>
        <div className="onboarding-q-progress-track">
          <div className="onboarding-q-progress-fill" style={{ width: '5%' }} />
        </div>
        <span className="onboarding-q-progress-status">Complete</span>
      </div>

      {/* Form Card */}
      <div className="onboarding-q-card">
        <div className="onboarding-q-card-gradient" />
        <div className="onboarding-q-card-inner">
          <h2 className="onboarding-q-title">Personal Information</h2>
          <p className="onboarding-q-subtitle">First, tell us Your Name</p>

          {error && <div className="auth-error-message">{error}</div>}

          <form noValidate onSubmit={handleSubmit}>
            {/* Name Section */}
            <div className="onboarding-q-fields">
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  placeholder="Last Name *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Dropdown
                placeholder="Nationality"
                options={COUNTRIES}
                value={nationality}
                onChange={setNationality}
                className="onboarding-q-dropdown-full"
                searchable
              />
            </div>

            {/* Date of Birth Section */}
            <p className="onboarding-q-section-subtitle">Enter Your Date of Birth</p>

            <div className="onboarding-q-dob-row">
              <Dropdown
                placeholder="Year *"
                options={YEARS}
                value={birthYear}
                onChange={setBirthYear}
                width={`calc(113px * var(--s))`}
              />
              <Dropdown
                placeholder="Month *"
                options={MONTHS}
                value={birthMonth}
                onChange={setBirthMonth}
                width={`calc(149px * var(--s))`}
              />
              <Dropdown
                placeholder="Day *"
                options={DAYS}
                value={birthDay}
                onChange={setBirthDay}
                width={`calc(98px * var(--s))`}
              />
            </div>

            {/* Location Section */}
            <p className="onboarding-q-section-subtitle">Your Location</p>
            <p className="onboarding-q-section-hint">(helps us provide relevant information)</p>

            <div className="onboarding-q-fields">
              <Dropdown
                placeholder="Country of Residence *"
                options={COUNTRIES}
                value={country}
                onChange={(val) => { setCountry(val); setStateRegion(''); }}
                className="onboarding-q-dropdown-full"
                searchable
              />
              {REGIONS_BY_COUNTRY[country] && (
                <Dropdown
                  placeholder="State / Region"
                  options={REGIONS_BY_COUNTRY[country]}
                  value={stateRegion}
                  onChange={setStateRegion}
                  className="onboarding-q-dropdown-full"
                  searchable
                />
              )}
            </div>

            {/* Continue Button */}
            <div className="onboarding-q-buttons">
              <BtnSubmit label="Continue" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

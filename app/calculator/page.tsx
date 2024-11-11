'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('household');
  const [emissions, setEmissions] = useState({
    household: 0,
    transportation: 0,
  });
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [formData, setFormData] = useState({
    // Household data
    numPeople: 0,
    country: '',
    housingSize: 0,
    housingType: '',
    energyConsumption: 0,
    cleanEnergyPercent: 0,
    heatingSource: '',

    // Transport data - daily
    metroHours: 0,
    busHours: 0,
    carHours: 0,
    trainHours: 0,
    airplaneHours: 0,
    autorickshawHours: 0,
    bikeHours: 0,
    evHours: 0,

    // Air travel - yearly
    veryLongFlights: 0,
    longFlights: 0,
    mediumFlights: 0,
    shortFlights: 0,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateHouseholdEmissions = () => {
    // Base calculations
    let totalEmissions = 0;

    // Housing size impact (rough estimate: 20kg CO2 per m2 per year)
    const housingSizeEmissions = (formData.housingSize * 20) / 365; // Daily emissions

    // Energy consumption impact
    // Average emissions factor: 0.5 kg CO2 per kWh (varies by country)
    const energyEmissions =
      formData.energyConsumption *
      0.5 *
      (1 - formData.cleanEnergyPercent / 100);

    // Heating source impact
    const heatingFactors: { [key: string]: number } = {
      '1': 0.2, // Natural Gas
      '2': 0.25, // Heating oil
      '3': 0.1, // Wood
      '4': 0.05, // Vegetable oil
      '5': 0.3, // Peat
      '6': 0.35, // Charcoal
      '7': 0, // No heating
      '8': 0.15, // Electricity
    };

    const heatingEmissions =
      formData.energyConsumption *
      (heatingFactors[formData.heatingSource] || 0);

    // Calculate total household emissions
    totalEmissions = housingSizeEmissions + energyEmissions + heatingEmissions;

    // Adjust for number of people
    if (formData.numPeople > 0) {
      totalEmissions = totalEmissions / formData.numPeople;
    }

    // Calculate transportation emissions
    const transportFactors = {
      metro: 0.03,
      bus: 0.08,
      car: 0.2,
      train: 0.04,
      airplane: 0.25,
      autorickshaw: 0.1,
      bike: 0,
      ev: 0.05,
    };

    // Daily transport emissions
    const dailyTransportEmissions =
      formData.metroHours * transportFactors.metro +
      formData.busHours * transportFactors.bus +
      formData.carHours * transportFactors.car +
      formData.trainHours * transportFactors.train +
      formData.airplaneHours * transportFactors.airplane +
      formData.autorickshawHours * transportFactors.autorickshaw +
      formData.bikeHours * transportFactors.bike +
      formData.evHours * transportFactors.ev;

    // Yearly flight emissions converted to daily
    const flightFactors = {
      veryLong: 3.0,
      long: 2.0,
      medium: 1.0,
      short: 0.5,
    };

    const yearlyFlightEmissions =
      formData.veryLongFlights * flightFactors.veryLong +
      formData.longFlights * flightFactors.long +
      formData.mediumFlights * flightFactors.medium +
      formData.shortFlights * flightFactors.short;

    const dailyFlightEmissions = yearlyFlightEmissions / 365;

    const totalTransportEmissions =
      dailyTransportEmissions + dailyFlightEmissions;

    setEmissions({
      household: Number(totalEmissions.toFixed(2)),
      transportation: Number(totalTransportEmissions.toFixed(2)),
    });

    handleCalculate();
    handleTabChange('log');
  };

  const handleCalculate = () => {
    const total = Object.values(emissions).reduce(
      (sum, value) => sum + value,
      0
    );
    setTotalEmissions(Number(total.toFixed(2)));
  };

  return (
    <div className="container text-[#4D3503]">
      <style>
        {`
          .welcome-section {
            margin: 40px 0;
        }

        .welcome-section h1 {
            margin-bottom: 20px;
            font-weight: normal;
        }

        .welcome-section h1 span {
        }

        .welcome-section p {
            margin-bottom: 30px;
        }

        .tab-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .tab-button {
            padding: 14px 25px;
            border: none;
            flex: 1;
            font-size: 24px;
            cursor: pointer;
            color: white;
            font-family: SwearDisplay, serif;
        }

        .household { background-color: #3C4A2D; }
        .transport { background-color: #4A5568; }
        .lifestyle { background-color: #E6B5A0; color: #A85944; }
        .log { background-color: #E5B94E; color: #4a4a4a; }
        .rewards { background-color: #5F9EA0; }

        .form-section {
            margin-bottom: 40px;
        }

        .form-section h2 {
            margin-bottom: 30px;
            font-weight: normal;
        }

        .form-section h2 span {
        }

        .form-group {
            margin-bottom: 20px;
            gap: 20px;
            max-width: 100%;
            align-items: center;
            display: flex;
        }

        .form-group label {
        font-size: 17px;
        margin-right: 20px;
        }

        .form-group input,
        .form-group select {
            padding: 8px 12px;
            border: 1px solid #4D3503;
            width: 100%;
            max-width: 250px;
            background-color: transparent;
            line-height: 1
        }

        .unit {
            display: inline-flex;
            gap: 10px;
            align-items: center;
        }

        .unit input {
            flex: 1;
        }

        .unit span {
            white-space: nowrap;
        }

        .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: flex-end;
            margin-top: 40px;
        }

        .action-button {
            padding: 8px 40px;
            border: none;
            cursor: pointer;
            color: white;
        }

        .calculate { background-color: #4A5568; }
        .log-button { background-color: #E6B5A0; color: #4a4a4a; }

        /* Responsive Design */
        @media (max-width: 768px) {
            nav {
                justify-content: center;
                text-align: center;
            }

            .nav-links {
                justify-content: center;
                width: 100%;
            }

            .form-group {
                grid-template-columns: 1fr;
                gap: 10px;
            }

            .action-buttons {
                justify-content: center;
                flex-wrap: wrap;
            }

            .tab-buttons {
                justify-content: center;
            }
        }

        @media (max-width: 480px) {
            .nav-links {
                flex-direction: column;
                gap: 15px;
            }

            .tab-button {
                width: 100%;
                text-align: center;
            }

            .action-button {
                width: 100%;
            }
        }
        `}
      </style>
      <section className="welcome-section flex flex-col gap-0 text-[#4D3503]">
        <h1 className="font-swear text-5xl">
          <span className="font-thin" style={{ fontStyle: 'normal' }}>
            Hi
          </span>{' '}
          Aadhya,
        </h1>
        <p className="font-droid text-lg">
          Welcome to Unnati's Emission Calculator! Calculate and log your
          emissions for today.
        </p>

        <div className="tab-buttons w-full gap-2">
          <button
            className={`tab-button household ${
              activeTab === 'household' ? 'active' : ''
            }`}
            onClick={() => handleTabChange('household')}
          >
            Household
          </button>
          <button
            className={`tab-button transport ${
              activeTab === 'transport' ? 'active' : ''
            }`}
            onClick={() => handleTabChange('transport')}
          >
            Transport
          </button>
          <button
            className={`tab-button log ${activeTab === 'log' ? 'active' : ''}`}
            onClick={() => handleTabChange('log')}
          >
            Log
          </button>
          <button
            className={`tab-button rewards ${
              activeTab === 'rewards' ? 'active' : ''
            }`}
            onClick={() => handleTabChange('rewards')}
          >
            Rewards
          </button>
        </div>
      </section>

      {activeTab === 'household' ? (
        <>
          <section className="form-section text-[#4D3503]">
            <h2 className="font-swear text-4xl">
              <span className="font-thin">About your</span> Household
            </h2>

            <div className="form-group">
              <label>Number of people in the household</label>
              <input
                type="number"
                min="1"
                name="numPeople"
                value={formData.numPeople}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Country of residence</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="AF">Afghanistan</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BR">Brazil</option>
                <option value="BN">Brunei</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="CV">Cabo Verde</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CR">Costa Rica</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="SZ">Eswatini</option>
                <option value="ET">Ethiopia</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GR">Greece</option>
                <option value="GD">Grenada</option>
                <option value="GT">Guatemala</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HN">Honduras</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">North Korea</option>
                <option value="KR">South Korea</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Laos</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="QA">Qatar</option>
                <option value="RO">Romania</option>
                <option value="RU">Russia</option>
                <option value="RW">Rwanda</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syria</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
            </div>

            <div className="form-group">
              <label>Size of housing (m2)</label>
              <input
                type="number"
                min="0"
                name="housingSize"
                value={formData.housingSize}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Type of housing</label>
              <select
                name="housingType"
                value={formData.housingType}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="detached">Detached house</option>
                <option value="semi-attached">Semi-attached house</option>
                <option value="flat">Flat/Apartment</option>
                <option value="attached">Attached single family home</option>
              </select>
            </div>
          </section>

          <section className="form-section">
            <h2 className="font-swear text-4xl text-[#4D3503]">
              <span className="font-thin">Energy</span> Consumption
            </h2>

            <div className="form-group">
              <label>Energy consumption</label>
              <div className="unit">
                <input
                  type="number"
                  min="0"
                  name="energyConsumption"
                  value={formData.energyConsumption}
                  onChange={handleInputChange}
                />
                <span>kWh/day</span>
              </div>
            </div>

            <div className="form-group">
              <label>Consumption from a clean energy source</label>
              <div className="unit">
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="cleanEnergyPercent"
                  value={formData.cleanEnergyPercent}
                  onChange={handleInputChange}
                />
                <span>%</span>
              </div>
            </div>

            <div className="form-group">
              <label>Heating energy source</label>
              <select
                name="heatingSource"
                value={formData.heatingSource}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">Natural Gas</option>
                <option value="2">Heating oil</option>
                <option value="3">Wood</option>
                <option value="4">Vegetable oil</option>
                <option value="5">Peat</option>
                <option value="6">Charcoal</option>
                <option value="7">No heating</option>
                <option value="8">Electricity</option>
              </select>
            </div>
          </section>
        </>
      ) : activeTab === 'transport' ? (
        <>
          <section className="form-section text-[#4D3503]">
            <h2 className="font-swear text-4xl">
              <span className="font-thin">How do you</span> Travel
            </h2>

            <p>Average hours travelled by all family members in a day</p>

            <div className="mt-4 grid lg:grid-cols-4 grid-cols-2 [&>.form-group]:justify-between [&>.form-group>input]:max-w-[100px] gap-x-12">
              <div className="form-group">
                <label>Metro</label>
                <input
                  type="number"
                  min="0"
                  name="metroHours"
                  value={formData.metroHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  min="0"
                  name="busHours"
                  value={formData.busHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Car</label>
                <input
                  type="number"
                  min="0"
                  name="carHours"
                  value={formData.carHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Train</label>
                <input
                  type="number"
                  min="0"
                  name="trainHours"
                  value={formData.trainHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Airplane</label>
                <input
                  type="number"
                  min="0"
                  name="airplaneHours"
                  value={formData.airplaneHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Auto Rickshaw</label>
                <input
                  type="number"
                  min="0"
                  name="autorickshawHours"
                  value={formData.autorickshawHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Bike</label>
                <input
                  type="number"
                  min="0"
                  name="bikeHours"
                  value={formData.bikeHours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Electric Vehicle</label>
                <input
                  type="number"
                  min="0"
                  name="evHours"
                  value={formData.evHours}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="font-swear text-4xl text-[#4D3503]">
              <span className="font-thin">Air</span> Travel (per year)
            </h2>
            <div className="form-group">
              <label>
                Very long range round-trip flights ({'>'}12000 km or {'>'}14
                hours one way) per year
              </label>
              <input
                type="number"
                min="0"
                name="veryLongFlights"
                value={formData.veryLongFlights}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                {
                  'Long range round-trip flights (<12000 km or <14 hours one way) per year'
                }
              </label>
              <input
                type="number"
                min="0"
                name="longFlights"
                value={formData.longFlights}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                {
                  'Medium range round-trip flights (<6000 km or <8 hours one way) per year'
                }
              </label>
              <input
                type="number"
                min="0"
                name="mediumFlights"
                value={formData.mediumFlights}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                {
                  'Short range round-trip flights (<3000 km or <6 hours one way) per year'
                }
              </label>
              <input
                type="number"
                min="0"
                name="shortFlights"
                value={formData.shortFlights}
                onChange={handleInputChange}
              />
            </div>
          </section>
        </>
      ) : activeTab === 'log' ? (
        <>
          <div className="mb-8 space-y-5">
            <h2 className="font-swear text-4xl">
              <span className="font-thin">Daily</span> Log
            </h2>
            <h2 className="font-swear text-black text-5xl font-medium">
              {totalEmissions} kg CO<sub>2</sub>
            </h2>
            <p>
              Make sure your emissions cap does not exceed 30 kg CO₂ per day to
              unlock rewards!
            </p>
          </div>
          <div className="space-y-5">
            <h2 className="font-swear font-thin text-4xl">Activities</h2>
            <p className="text-lg">Emissions from:</p>
            <div className="form-group">
              <label>Household</label>
              <div className="unit">
                <input
                  type="number"
                  min="0"
                  name="householdEmissions"
                  value={emissions.household}
                  disabled
                  onChange={handleInputChange}
                />
                <span>kg CO₂</span>
              </div>
            </div>

            <div className="form-group">
              <label>Transportation</label>
              <div className="unit">
                <input
                  type="number"
                  min="0"
                  disabled
                  name="transportationEmissions"
                  value={emissions.transportation}
                  onChange={handleInputChange}
                />
                <span>kg CO₂</span>
              </div>
            </div>
          </div>
        </>
      ) : activeTab === 'rewards' ? (
        <>
          <h2 className="font-swear text-5xl">
            <span className="font-thin">Daily</span> Rewards
          </h2>
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
            <div className="flex overflow-hidden bg-[#e8e3d7]">
              <div className="w-12 md:w-16 bg-[#4a4e69]" />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4b3621] mb-4">
                  TRYNEW
                </h2>
                <p className="text-[#4b3621] text-sm md:text-base mb-6 leading-relaxed">
                  Upto Rs. 500 off on orders above Rs. 1500. Applicable till
                  November 30, 2024.
                </p>
                <button className="text-[#4b3621] font-semibold text-lg md:text-xl hover:underline">
                  Redeem Now
                </button>
              </div>
            </div>
            <div className="flex overflow-hidden bg-[#e8e3d7]">
              <div className="w-12 md:w-16 bg-[#FABA9C]" />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4b3621] mb-4">
                  WISH100
                </h2>
                <p className="text-[#4b3621] text-sm md:text-base mb-6 leading-relaxed">
                  Upto Rs. 500 off on orders above Rs. 1500. Applicable till
                  November 30, 2024.
                </p>
                <button className="text-[#4b3621] font-semibold text-lg md:text-xl hover:underline">
                  Redeem Now
                </button>
              </div>
            </div>
            <div className="flex overflow-hidden bg-[#e8e3d7]">
              <div className="w-12 md:w-16 bg-[#F3C14E]" />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4b3621] mb-4">
                  FLAT50
                </h2>
                <p className="text-[#4b3621] text-sm md:text-base mb-6 leading-relaxed">
                  Upto Rs. 500 off on orders above Rs. 1500. Applicable till
                  November 30, 2024.
                </p>
                <button className="text-[#4b3621] font-semibold text-lg md:text-xl hover:underline">
                  Redeem Now
                </button>
              </div>
            </div>
            <div className="flex overflow-hidden bg-[#e8e3d7]">
              <div className="w-12 md:w-16 bg-[#415814]" />
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4b3621] mb-4">
                  FALLSALE
                </h2>
                <p className="text-[#4b3621] text-sm md:text-base mb-6 leading-relaxed">
                  Upto Rs. 500 off on orders above Rs. 1500. Applicable till
                  November 30, 2024.
                </p>
                <button className="text-[#4b3621] font-semibold text-lg md:text-xl hover:underline">
                  Redeem Now
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {activeTab === 'rewards' ? (
        <div className="ml-auto mt-8 flex justify-end">
          <button
            className="font-swear text-xl ml-auto text-white bg-[#469CB1]"
            style={{ padding: '8px 40px' }}
            onClick={() => handleTabChange('household')}
          >
            Calculator
          </button>
        </div>
      ) : (
        activeTab !== 'log' && (
          <div className="action-buttons font-swear text-xl">
            <button
              className="action-button calculate"
              onClick={calculateHouseholdEmissions}
            >
              Calculate
            </button>
            <button
              onClick={() => handleTabChange('log')}
              className="action-button log-button"
            >
              Log
            </button>
          </div>
        )
      )}
    </div>
  );
}

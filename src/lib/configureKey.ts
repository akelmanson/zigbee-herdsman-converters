import {Definition} from './types';

const lookup: {[s: string]: number} = {};

function hashCode(str: string) {
    let hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export function getConfigureKey(definition: Definition) {
    if (!definition.configure) {
        throw new Error(`'${definition.model}' has no configure`);
    }

    // Prevent unnecessary recalculation of the hash
    // @ts-expect-error
    if (definition.configure in lookup) return lookup[definition.configure];

    const body = definition.configure.toString().replace(/\s/g, '');
    const hash = hashCode(body);
    const legacyKey = `${definition.model}_${hash}`;

    /**
     * Previously the configureKey was hardcoded, e.g. `meta: {configureKey: 1},`.
     * Now the configureKey is calculated from the configure method body.
     * This saves us from having to bump the configureKey manually.
     * Since this change would change all configure keys, all devices would be reconfigured again.
     * This is unnecessary, therefore we still return the old configure keys (which are in legacyKeys)
     * if the hash dind't change.
     */
    const configureKey = legacyKey in legacyKeys ? legacyKeys[legacyKey] : hash;
    // @ts-expect-error
    lookup[definition.configure] = configureKey;
    return configureKey;
}

const legacyKeys: {[s: string]: number} = {
    'HR-C99C-Z-C045_-148006960': 1,
    '9CZA-A806ST-Q1A_88764544': 2,
    '9CZA-M350ST-Q1A_88764544': 2,
    '9CZA-G1521-Q1A_88764544': 2,
    '81809/81813_88764544': 2,
    '81825_-1560235388': 1,
    '81849_-1455162343': 1,
    '81855_-1455162343': 1,
    'BPU3_1466202208': 1,
    '4713407_-1239574396': 2,
    'CTR.UBX_1721592371': 1,
    'Aj_Zigbee_Led_Strip_88764544': 2,
    'AJ_ZB_GU10_88764544': 2,
    'L122FF63H11A5.0W_88764544': 2,
    'L122CB63H11A9.0W_88764544': 2,
    'L122AA63H11A6.5W_88764544': 2,
    'F122SB62H22A4.5W_88764544': 2,
    'C422AC11D41H140.0W_88764544': 2,
    'C422AC14D41H140.0W_88764544': 2,
    '67200BL_639411107': 1,
    'Z6_398307118': 1,
    'AU-A1GUZBCX5_88764544': 2,
    'AU-A1GUZBRGBW_88764544': 2,
    'AU-A1GSZ9RGBW_HV-GSCXZB269K_88764544': 2,
    'AU-A1ZBRC_-553015049': 3,
    'AU-A1ZBPIRS_-665295647': 1,
    'AU-A1ZBPIAB_-1178502593': 1,
    'AU-A1ZB2WDM_2090352162': 1,
    'AU-A1ZBDSS_-1536984949': 1,
    'AU-A1ZBPIA_1258907102': 2,
    'AU-A1ZBR1GW_1845557000': 1,
    'AU-A1ZBR2GW_-989822386': 1,
    '33943_88764544': 2,
    '33944_88764544': 2,
    '33957_88764544': 2,
    'GR-ZB01-W_-1038390425': 1,
    'AV2010/34_-994008938': 1,
    'AV2010/25_303660478': 4,
    '902010/128_-353372667': 4,
    'AV2010/32_193736969': 2,
    '902010/23_1063885199': 1,
    'SCM-S1_1213477653': 1,
    'BW-SS7_1gang_-1851317188': 1,
    'BW-SS7_2gang_-1884513748': 1,
    'RADON TriTech ZB_574458647': 1,
    'ISW-ZPR1-WP13_-1086848621': 1,
    'K4003C/L4003C/N4003C/NT4003C_1470073968': 2,
    'L441C/N4411C/NT4411C_-254070600': 2,
    'K4027C/L4027C/N4027C/NT4027C_1020870383': 1,
    'F20T60A_-1451534777': 1,
    'L4531C_-1451534777': 3,
    '6735/6736/6737_-1219220114': 3,
    '421792_88764544': 2,
    '4256251-RZHAC_-1218688314': 3,
    '4257050-ZHAC_930999411': 4,
    '4257050-RZHAC_136361239': 2,
    '3323-G_1257941778': 1,
    '3400-D_1389441515': 1,
    '3157100_386439104': 1,
    '4200-C_-353372667': 1,
    'PSM-29ZBSR_1783627105': 4,
    'RS-23ZBS_1150185605': 1,
    '53170161_88764544': 2,
    'ti.router_-711150662': 1,
    'V3-BTZB_923668394': 5,
    '014G2461_-1063983552': 4,
    'HLU2909K_-301703570': 1,
    'HSE2905E_-459241467': 3,
    '0402946_-1131322398': 1,
    'PM-C140-ZB_175167552': 3,
    'PM-B530-ZB_175167552': 3,
    'PM-B540-ZB_898285025': 1,
    'PM-B430-ZB_175167552': 3,
    'PM-S140-ZB_1466202208': 1,
    'PM-S240-ZB_58909323': 1,
    'PM-S340-ZB_-581830709': 1,
    'PM-S140R-ZB_1466202208': 1,
    'PM-S240R-ZB_58909323': 1,
    'PM-S340R-ZB_-581830709': 1,
    'PM-S150-ZB_1466202208': 1,
    'PM-S250-ZB_58909323': 1,
    'PM-S350-ZB_-581830709': 1,
    'PM-C150-ZB_175167552': 1,
    'SG-V100-ZB_-1675868517': 1,
    'SPLZB-131_-1433624563': 2,
    'SPLZB-132_-1713595071': 3,
    'SPLZB-134_-710113148': 1,
    'SMRZB-143_-710113148': 1,
    'EMIZB-132_1308053154': 9,
    'SMSZB-120_241952259': 1,
    'HESZB-120_241952259': 1,
    'WISZB-120_-2052584222': 1,
    'MOSZB-140_-92249291': 1,
    'HMSZB-110_-736719190': 2,
    'ZHEMI101_-570313272': 1,
    'SMRZB-332_-570313272': 1,
    'DIYRuZ_FreePad_-1164805536': 1,
    'FreePad_LeTV_8_-1164805536': 1,
    'DIYRuZ_Geiger_1515339524': 1,
    'DIYRuZ_Flower_1834002472': 1,
    'DIYRuZ_AirSense_-1397322426': 1,
    'Mega23M12_88764544': 2,
    'XVV-Mega23M12_88764544': 2,
    'EasyCode903G2.1_1220202591': 1,
    'RL460WHZHA69_88764544': 2,
    'SAGE206611_785189978': 1,
    '4655BC0-R_1257941778': 1,
    'A9A19A60WESDZ02_88764544': 2,
    'A9BR3065WESDZ02_88764544': 2,
    'D1821_88764544': 2,
    'D1542_88764544': 2,
    '1TST-EU_1215199571': 1,
    'PLUG EDP RE:DY_-1416421624': 3,
    'SWITCH EDP RE:DY_-975288168': 2,
    '316GLEDRF_1466202208': 1,
    '43076_1466202208': 1,
    '43080_-1674843135': 1,
    '43100_-42907828': 1,
    '43082_-1674843135': 1,
    '43084_1466202208': 1,
    '43090_-1674843135': 1,
    'ZG102-BOX-UNIDIM_-1674843135': 1,
    'SPZB0001_-478474422': 3,
    'SA-003-Zigbee_-353372667': 1,
    'ZB-SW02_-1884513748': 1,
    'ZB-SW03_-1997814597': 1,
    'ECW-100-A03_-1997814597': 1,
    'TZSW22FW-L4_-1140672598': 1,
    'SBM01ZB_1553276182': 1,
    'SSA01ZB_1553276182': 1,
    'SCA01ZB_1553276182': 1,
    'SLS301ZB_2_-1140672598': 1,
    'SLS301ZB_3_934212491': 1,
    '45852GE_1466202208': 1,
    '45853GE_1783627105': 4,
    '45856GE_1466202208': 1,
    '45857GE_1466202208': 1,
    'PTAPT-WH02_513000575': 1,
    'GWA1521_1466202208': 1,
    'GWA1531_734529022': 1,
    'GL-H-001_88764544': 2,
    'GL-C-006_88764544': 2,
    'GL-C-006S_88764544': 2,
    'GL-C-006P_88764544': 2,
    'GL-C-007-1ID_88764544': 2,
    'GL-C-007-2ID_88764544': 2,
    'GL-C-007S_1676534437': 2,
    'GL-C-007P_88764544': 2,
    'GL-C-008-2ID_88764544': 2,
    'GL-C-008-1ID_88764544': 2,
    'GL-C-008S_88764544': 2,
    'GL-C-008P_88764544': 2,
    'GL-MC-001_88764544': 2,
    'GL-MC-001P_88764544': 2,
    'GL-S-003Z_1676534437': 2,
    'GL-S-004Z_88764544': 2,
    'GL-S-005Z_88764544': 2,
    'GL-S-004ZS_88764544': 2,
    'GL-S-004P_88764544': 2,
    'GL-S-007Z_88764544': 2,
    'GL-S-007ZS_88764544': 2,
    'GL-S-007P_88764544': 2,
    'GL-S-008Z_88764544': 2,
    'GL-B-001Z_88764544': 2,
    'GL-B-001ZS_88764544': 2,
    'GL-B-001P_88764544': 2,
    'GL-B-007Z_88764544': 2,
    'GL-B-007ZS_88764544': 2,
    'GL-B-007P_88764544': 2,
    'GL-B-008Z_88764544': 2,
    'GL-B-008ZS_88764544': 2,
    'GL-B-008P_88764544': 2,
    'GL-D-003Z_88764544': 2,
    'GL-D-003ZS_88764544': 2,
    'GL-D-003P_88764544': 2,
    'GL-D-004Z_88764544': 2,
    'GL-D-004ZS_88764544': 2,
    'GL-D-004P_88764544': 2,
    'GL-D-005Z_88764544': 2,
    'GL-D-005ZS_88764544': 2,
    'GL-D-005P_88764544': 2,
    'GL-FL-004TZ_88764544': 2,
    'GL-FL-004TZS_88764544': 2,
    'GL-FL-004P_88764544': 2,
    'GL-FL-005TZ_88764544': 2,
    'GL-FL-005TZS_88764544': 2,
    'GL-FL-005P_88764544': 2,
    'GL-FL-006TZ_88764544': 2,
    'GL-FL-006TZS_88764544': 2,
    'GL-FL-006P_88764544': 2,
    'GL-G-001Z_88764544': 2,
    'GL-G-001ZS_88764544': 2,
    'GL-G-001P_88764544': 2,
    'GL-G-007Z_88764544': 2,
    'B07KG5KF5R_88764544': 2,
    'SSHM-I1_491743244': 1,
    'BRHM8E27W70-I1_1676534437': 2,
    '99432_-1806066778': 1,
    '54668161_88764544': 2,
    'HS1CA-M_1553276182': 1,
    'HS2SK_-1105234664': 5,
    'HS2SK_nxp_1881458503': 5,
    'HS1SA_491743244': 1,
    'HS3SA_491743244': 1,
    'HS3DS_1036280848': 1,
    'HS1DS_1036280848': 1,
    'HS1WL/HS3WL_1036280848': 1,
    'HS1RC-N_1036280848': 1,
    'HM1RC-2-E_1036280848': 1,
    'HS1RC-EM_1036280848': 1,
    'HS1CA-E_491743244': 1,
    'HS2WD-E_491743244': 1,
    'HS1HT_-1546832024': 2,
    'HS1HT-N_597388242': 1,
    'SKHMP30-I1_873258064': 4,
    'HS2ESK-E_-1105234664': 4,
    'STHM-I1H_94414168': 1,
    'HS1EB/HS1EB-E_1036280848': 1,
    'HS2SS_-1069468650': 1,
    'HS1VS-N_1036280848': 1,
    'HS1VS-EF_1036280848': 1,
    'HS2AQ-EM_-492954587': 1,
    'HS2IRC_1630495734': 1,
    'BDHM8E27W70-I1_88764544': 2,
    'HS2SW1A/HS2SW1A-N_-1621764089': 1,
    'HS2SW2A/HS2SW2A-N_-1610006317': 1,
    'HS2SW3A/HS2SW3A-N_136583522': 1,
    'HS2CM-N-DC_884460401': 1,
    'GLSK3ZB-1712_-1884513748': 1,
    'GLSK3ZB-1713_-1997814597': 1,
    'GLSK6ZB-1714_-652790423': 1,
    'GLSK6ZB-1715_-1379451466': 1,
    'GLSK6ZB-1716_-1915097310': 1,
    'MOT003_752847752': 1,
    'DWS003_752847752': 1,
    'HV-GSCXZB229B_88764544': 2,
    '1613V_694625864': 3,
    'HV-GSCXZB269_88764544': 2,
    'HV-GSCXZB279_HV-GSCXZB229_HV-GSCXZB229K_88764544': 2,
    'HV-GUCXZB5_88764544': 2,
    'UK7004240_-1419162246': 1,
    'SLR1b_1715456678': 1,
    'SLR2_-1078819997': 3,
    'SLR2b_-1078819997': 3,
    'U86K31ND6_1351642653': 1,
    '10011725_88764544': 2,
    '10297667_88764544': 2,
    '10011723_88764544': 2,
    '10011722_88764544': 2,
    '10297666_88764544': 2,
    '10011724_88764544': 2,
    '10297665_88764544': 2,
    'ICZB-IW11D_-1674843135': 1,
    'ICZB-DC11_-1674843135': 1,
    'ICZB-IW11SW_-1755039265': 1,
    'ICZB-B1FC60/B3FC64/B2FC95/B2FC125_88764544': 2,
    'ICZB-R11D_-1674843135': 1,
    'ICZB-R12D_-1674843135': 1,
    'LED1545G12_88764544': 2,
    'T2011_88764544': 2,
    'LED1546G12_88764544': 2,
    'LED1537R6/LED1739R5_88764544': 2,
    'LED1536G5_88764544': 2,
    'LED1903C5/LED1835C6_88764544': 2,
    'LED1733G7_88764544': 2,
    'LED1624G9_1676534437': 2,
    'LED1924G9_1676534437': 2,
    'LED1732G11_88764544': 2,
    'LED1736G9_88764544': 2,
    'T1820_88764544': 2,
    'ICTC-G-1_958235471': 1,
    'L1527_88764544': 2,
    'L1529_88764544': 2,
    'L1530_88764544': 2,
    'L1528_88764544': 2,
    'L1531_88764544': 2,
    'E1603/E1702_1466202208': 1,
    'E1524/E1810_996882109': 1,
    'W2049_369126006': 1,
    'E1743_-1158733963': 1,
    'E1841_-1158733963': 1,
    'E1842_1466202208': 1,
    'E1812_1426909482': 1,
    'E1744_958235471': 1,
    'E1525/E1745_-98329414': 1,
    'E1746_39848625': 2,
    'E1757_-881591257': 2,
    'E1926_-881591257': 2,
    'E1766_-1158733963': 1,
    'T1828_88764544': 2,
    'T1829_88764544': 2,
    'LED1738G7_88764544': 2,
    'LED1923R5_88764544': 2,
    '511.201_-1674843135': 1,
    '5120.1100_-1674843135': 1,
    '511.202_-1755039265': 1,
    '5120.1200_-1755039265': 1,
    '5120.1210_-1755039265': 1,
    '511.040_88764544': 2,
    '511.000_88764544': 2,
    '07089L_88764544': 2,
    '07004D/07005L_88764544': 2,
    '07008L_88764544': 2,
    '07048L_-180916499': 9,
    '07115L_88764544': 2,
    '07047L_-721934617': 2,
    '07073L_88764544': 2,
    '07042L_88764544': 2,
    'FL 140 C_88764544': 2,
    'FL 130 C_88764544': 2,
    'FL 120 C_88764544': 2,
    'RB 185 C_88764544': 2,
    'BY 185 C_88764544': 2,
    'RB 250 C_88764544': 2,
    'RB 278 T_88764544': 2,
    'RB 285 C_88764544': 2,
    'BY 285 C_88764544': 2,
    'RB 178 T_88764544': 2,
    'BY 178 T_88764544': 2,
    'RS 128 T_88764544': 2,
    'RS 228 T_88764544': 2,
    'RS 229 T_88764544': 2,
    'RS 230 C_88764544': 2,
    'RB 248 T_88764544': 2,
    'RB 148 T_88764544': 2,
    'AE 280 C_88764544': 2,
    'SP 120_-970921602': 6,
    'SP 220_1466202208': 1,
    'SP 222_1466202208': 1,
    'SP 224_1466202208': 2,
    'OFL 120 C_88764544': 2,
    'OFL 140 C_88764544': 2,
    'OSL 130 C_88764544': 2,
    '57008000_-1277534575': 1,
    'IL06_1_574458647': 1,
    '3210-L_1034369459': 5,
    '3326-L_574458647': 2,
    '3320-L_574458647': 1,
    '3450-L_1449459300': 1,
    '3460-L_-374819602': 1,
    'iL07_1_-1045491241': 1,
    '27087-03_323577616': 1,
    'K2RGBW01_88764544': 2,
    'SV01_-94213072': 1,
    'SV02_-94213072': 1,
    'ZCC-3500_1466202208': 1,
    'KMPCIL_RES005_-1125741793': 1,
    '2AJZ4KPKEY_-411428114': 1,
    '2AJZ4KPFT_1585486317': 1,
    'KS-SM001_-771124779': 1,
    '66492-001_1226555785': 3,
    '99140-002_1226555785': 3,
    '99100-045_2079885423': 4,
    '99100-006_1226555785': 4,
    'HK-LN-DIM-A_-1674843135': 2,
    '4058075181472_88764544': 2,
    'GPDRPLOP401100CE_88764544': 2,
    'AC25697_88764544': 2,
    'AC08560_88764544': 2,
    '4058075208414_88764544': 2,
    '4058075208339_88764544': 2,
    '4058075485174_88764544': 2,
    '4058075173989_88764544': 2,
    '4058075208353_88764544': 2,
    'ZM350STW1TCF_88764544': 2,
    'A806S-Q1G_88764544': 2,
    'ZA806SQ1TCF_88764544': 2,
    '6ARCZABZH_491743244': 1,
    '6xy-M350ST-W1Z_88764544': 2,
    'FC80CC_-1451534777': 1,
    'FC80RC_-1451534777': 1,
    '067646_1923730978': 2,
    '067776_1020870383': 1,
    '067773_-706163465': 2,
    '067774_-272580182': 1,
    '067694_-2134727694': 1,
    '067771_-254070600': 2,
    '067775_-1451534777': 3,
    '064888_-700785910': 2,
    '064873_-1787356036': 1,
    '412015_-1316523369': 1,
    '752189_-1787356036': 1,
    'DL15S-1BZ_1466202208': 1,
    'DG6HD-1BW_1466202208': 1,
    'RC-2000WH_2080074453': 1,
    'HG06337_-771124779': 1,
    'HG06668_491743244': 1,
    'HG06335_172811876': 1,
    'HG06336_-994008938': 1,
    'HG06338_1421721297': 1,
    'HG06104A_1842547789': 2,
    'HG06106B_1842547789': 2,
    'HG06106A_1842547789': 2,
    'HG06106C_1842547789': 2,
    'HG06492A_1811148075': 1,
    'HG06492B_1811148075': 1,
    'HG06492C_1811148075': 1,
    '14147206L_1811148075': 1,
    '14148906L_1842547789': 2,
    '14149505L/14149506L_1842547789': 2,
    'MCLH-02_88764544': 2,
    'MCLH-03_1881458503': 1,
    '200403V2-B_-1674843135': 1,
    '200106V3_1466202208': 1,
    'ZL1000100-CCT-US-V1A02_88764544': 2,
    'ZL1000400-CCT-EU-2-V1A02_88764544': 2,
    'ZL100050004_88764544': 2,
    'ZS110050078_491743244': 1,
    'ZS232000178_491743244': 1,
    'ZS190000118_1466202208': 1,
    'TI0001_-1584537915': 1,
    'TI0001-switch_-1584537915': 1,
    'TI0001-switch-2gang_-1584537915': 1,
    'TI0001-socket_-1584537915': 1,
    'TI0001-dimmer_-1584537915': 1,
    'TI0001-cover_-1584537915': 1,
    'QS-Zigbee-D02-TRIAC-2C-LN_2037756785': 1,
    'QS-Zigbee-D02-TRIAC-2C-L_-716749728': 1,
    '4000116784070_-771124779': 2,
    'ZB-RGBCW_88764544': 2,
    'QS-Zigbee-S04-2C-LN_-1884513748': 1,
    'QS-Zigbee-S05-LN_-1851317188': 1,
    '12AB_-1674843135': 1,
    '12050_805737782': 2,
    '12126_-353372667': 1,
    '12127_-2057794164': 2,
    'Z3-1BRL_-1603959706': 1,
    'MEAZON_BIZY_PLUG_399769828': 2,
    'MEAZON_DINRAIL_1014780245': 2,
    'MS-104Z_240216015': 1,
    'MS-104BZ_1620506091': 1,
    'ZK-EU-2U_-1884513748': 1,
    'ZTS-EU_1gang_-1851317188': 1,
    'SEA801-Zigbee/SEA802-Zigbee_821693351': 1,
    'MS-SP-LE27WRGB_88764544': 2,
    '404036_88764544': 2,
    '404017_-771124779': 1,
    '404000/404005/404012_88764544': 2,
    '404006/404008/404004_88764544': 2,
    '404024_88764544': 2,
    '44435_88764544': 2,
    '404028_88764544': 2,
    '404002_1721592371': 1,
    '404021_-1755039265': 1,
    '404037_88764544': 2,
    '404031_88764544': 2,
    '4512700_-1674843135': 2,
    '4512704_-1755039265': 1,
    '1402755_-1674843135': 1,
    '3802962_88764544': 2,
    '3802964_88764544': 2,
    '89665_88764544': 2,
    'N2G-SP_674842906': 3,
    'Z809A_-98119581': 2,
    '170-33505_-1950902545': 5,
    '552-80699_1018624792': 1,
    'Z809AF_175167552': 3,
    '98425031_-1674843135': 1,
    '98423051_-1755039265': 1,
    'HGZB-01_585186286': 2,
    'LXN59-2S7LX1.0_1620506091': 2,
    'HGZB-43_-1997814597': 1,
    'HGZB-043_934212491': 1,
    'HGZB-44_483258857': 1,
    'HGZB-042_-1140672598': 1,
    'HGZB-42_905362378': 1,
    'HGZB-20A_-87033071': 1,
    'XY12S-15_88764544': 2,
    'HGZB-06A_88764544': 2,
    'HGZB-DLC4-N12B_88764544': 2,
    '3A12S-15_88764544': 2,
    'NCZ-3011-HA_491743244': 1,
    'GWRJN5169_-1794950721': 1,
    'T18W3Z_-60678371': 2,
    'RL804CZB_88764544': 2,
    'RL804QZB_-597493282': 1,
    'ST20_-1546832024': 2,
    'ST21_-1546832024': 2,
    'ST30_-1546832024': 2,
    'T30W3Z_-597493282': 1,
    'T21W2Z_-1884513748': 1,
    'T21W1Z_-353372667': 1,
    'R11W2Z_-1884513748': 1,
    'R20W2Z_-911986776': 1,
    'AM25_-881591257': 1,
    '73699_1676534437': 2,
    '4058075816718_88764544': 2,
    '4058075816732_88764544': 2,
    'AA69697_88764544': 2,
    'AC25704_88764544': 2,
    'AC10787_88764544': 2,
    'AC25702_88764544': 2,
    'AC03645_88764544': 2,
    'AC03642_88764544': 2,
    'AC03647_88764544': 2,
    'AC16381_88764544': 2,
    'AA70155_88764544': 2,
    'AA68199_88764544': 2,
    '4058075148338_88764544': 2,
    'AB32840_88764544': 2,
    '4058075816794_88764544': 2,
    'AB401130055_88764544': 2,
    'AB3257001NJ_-440201058': 1,
    'AC10691_-1780925762': 1,
    '4052899926110_88764544': 2,
    '4058075036185_88764544': 2,
    '4058075036147_88764544': 2,
    '4058075047853_88764544': 2,
    'AC0363900NJ_88764544': 2,
    'AB35996_88764544': 2,
    'AC08559_88764544': 2,
    'AC01353010G_574458647': 1,
    'AC03648_88764544': 2,
    'AC0251100NJ/AC0251700NJ_1910007521': 1,
    '4058075816459_836988949': 1,
    '595UGR22_88764544': 2,
    'WSP404_-229912473': 1,
    'CB432_1885354737': 1,
    'PIR313-E_-980837332': 1,
    'NLG-CCT light_88764544': 2,
    'NLG-TW light_88764544': 2,
    'NLG-RGBW_light_88764544': 2,
    'NLG-RGBW light_88764544': 2,
    'NLG-RGB-TW light_88764544': 2,
    '100.110.51_88764544': 2,
    '100.075.74_88764544': 2,
    '100.001.96_88764544': 2,
    '100.491.61_88764544': 2,
    '929.66_88764544': 2,
    '500.47_88764544': 2,
    '50049/500.63_88764544': 2,
    '50064_88764544': 2,
    '929.63_88764544': 2,
    '371000001_88764544': 2,
    '371000002_88764544': 2,
    '3300-P_-979450867': 1,
    '4034031P7_88764544': 2,
    '4034031P6_88764544': 2,
    '4034030P6_88764544': 2,
    '5110131H5_88764544': 2,
    '3306431P7_88764544': 2,
    '1746130P7_88764544': 2,
    '1745630P7_88764544': 2,
    '5900131C5_88764544': 2,
    '7299760PH_1676534437': 2,
    '929002375901_88764544': 2,
    '929002376001_88764544': 2,
    '4090331P9_88764544': 2,
    '7146060PH_88764544': 2,
    '7602031P7_88764544': 2,
    '8718696167991_88764544': 2,
    '8718696170557_88764544': 2,
    '1744130P7_88764544': 2,
    '1745730V7_88764544': 2,
    '1743830P7_88764544': 2,
    '1743130P7_88764544': 2,
    '4090531P7_88764544': 2,
    '4090531P9_88764544': 2,
    '929001953101_88764544': 2,
    '548727_88764544': 2,
    '433714_88764544': 2,
    '9290022169_88764544': 2,
    '4090631P7_88764544': 2,
    '7299355PH_1676534437': 2,
    '915005106701_88764544': 2,
    '9290018187B_88764544': 2,
    '8718699703424_88764544': 2,
    '9290022890_88764544': 2,
    '9290022166_88764544': 2,
    '9290012573A_88764544': 2,
    '1743930P7_88764544': 2,
    '929002294101_88764544': 2,
    '929002294203_88764544': 2,
    '9290002579A_88764544': 2,
    '8718696485880_88764544': 2,
    '915005733701_88764544': 2,
    '464800_88764544': 2,
    '8718696695203_88764544': 2,
    '9290022944_88764544': 2,
    '8718696598283_88764544': 2,
    '929001953301_88764544': 2,
    '5995111U5_88764544': 2,
    '9290019534_88764544': 2,
    '3418131P6_88764544': 2,
    '3417931P6_88764544': 2,
    '3417711P6_88764544': 2,
    '9290011998B_88764544': 2,
    '9290022167_88764544': 2,
    '9290022267_88764544': 2,
    '8718696548738_88764544': 2,
    '915005587401_88764544': 2,
    '3402831P7_88764544': 2,
    '3418411P6_88764544': 2,
    '3435011P7_88764544': 2,
    '4503848C5_88764544': 2,
    '5996311U5_88764544': 2,
    '5996411U5_88764544': 2,
    '5996511U5_88764544': 2,
    '5996611U5_88764544': 2,
    '4090130P7_88764544': 2,
    '4090230P9_88764544': 2,
    '3261030P7_88764544': 2,
    '3261030P6_88764544': 2,
    '3261031P6_88764544': 2,
    '3261048P6_88764544': 2,
    '3216431P6_88764544': 2,
    '4505748C5_88764544': 2,
    '4098430P7_88764544': 2,
    '4507748C5_88764544': 2,
    '3261331P7_88764544': 2,
    '4096730U7_88764544': 2,
    '4096730P6_88764544': 2,
    '3216131P5_88764544': 2,
    '3216131P6_88764544': 2,
    '3216231P6_88764544': 2,
    '3216331P5_88764544': 2,
    '3216331P6_88764544': 2,
    '3216431P5_88764544': 2,
    '4033930P6_88764544': 2,
    '4033930P7_88764544': 2,
    '4023330P7_88764544': 2,
    '7199960PH_1676534437': 2,
    '929002376101_1676534437': 2,
    '929002376201_1676534437': 2,
    '929002376801_1676534437': 2,
    '1742930P7_88764544': 2,
    '1743030P7_88764544': 2,
    '1745930P7_88764544': 2,
    '1743230P7_88764544': 2,
    '1746430P7_88764544': 2,
    '7099930PH_1676534437': 2,
    '4080248P9_88764544': 2,
    '4080148P9_88764544': 2,
    '5060730P7_88764544': 2,
    '5061031P7_88764544': 2,
    '5062131P7_88764544': 2,
    '5062148P7_88764544': 2,
    '5062231P7_88764544': 2,
    '5062248P7_88764544': 2,
    '5062331P7_88764544': 2,
    '5062348P7_88764544': 2,
    '5062431P7_88764544': 2,
    '5062448P7_88764544': 2,
    '5063231P7_88764544': 2,
    '5063331P7_88764544': 2,
    '5063431P7_88764544': 2,
    '5045131P7_88764544': 2,
    '5045148P7_88764544': 2,
    '5055148P7_88764544': 2,
    '5055131P7_88764544': 2,
    '929003017102_-652168794': 1,
    '324131092621_1320723963': 1,
    '929002398602_-289016272': 2,
    '8718699693985_-278457027': 4,
    '9290012607_1260469993': 2,
    '9290019758_1260469993': 2,
    '929002240401_-771124779': 1,
    '046677552343_-771124779': 1,
    '8718699689308_-771124779': 1,
    '9290022408_-771124779': 1,
    '9290024426_-771124779': 1,
    '7099860PH_1676534437': 2,
    '3216231P5_88764544': 2,
    '17435/30/P7_88764544': 2,
    '1746330P7_88764544': 2,
    '1741830P7_88764544': 2,
    '1741530P7_88764544': 2,
    '1746230V7_88764544': 2,
    '9290022891_88764544': 2,
    '3115331PH_88764544': 2,
    '7121131PU_88764544': 2,
    '5041131P9_88764544': 2,
    '5042131P9_88764544': 2,
    '5047131P9_88764544': 2,
    '7531609_88764544': 2,
    '3418631P6_88764544': 2,
    '160-01_175167552': 1,
    '5412748727388_88764544': 2,
    'ZB-5121_1796851078': 1,
    'ZGRC-KEY-013_1466202208': 1,
    'ZB-5028_-715445216': 1,
    'ROB_200-004-0_-1674843135': 2,
    'ROB_200-011-0_-1674843135': 2,
    'ROB_200-003-0_-1755039265': 1,
    'ROB_200-003-1_-1755039265': 1,
    'ROB_200-014-0_-1674843135': 1,
    'ROB_200-010-0_424359850': 2,
    'SPE600_-1186389220': 4,
    'SP600_-1186389220': 4,
    'SR600_-1864443560': 4,
    'SM308_1801730331': 1,
    'SM309_-1674843135': 1,
    'BE468_-1996534945': 3,
    'WV704R0A0902_866257616': 1,
    'U202DST600ZB_-1633395186': 2,
    'CCT5010-0001_-1069299941': 1,
    'U201DST600ZB_2115037955': 1,
    'U201SRY2KWZB_182076854': 1,
    'U202SRY2KWZB_-619579899': 1,
    'MEG5113-0300/MEG5165-0000_-321561689': 1,
    '545D6514_-1882755890': 1,
    'ZHS-15_-1105234664': 3,
    'HAL300_88764544': 2,
    'PP-WHT-US_135599241': 4,
    'E12-N1E_88764544': 2,
    'E1G-G8E_88764544': 2,
    'Z01-A19NAE26_88764544': 2,
    'Z01-A60EAE27_88764544': 2,
    'E11-N1EA_88764544': 2,
    'E11-U2E_88764544': 2,
    'E11-U3E_88764544': 2,
    'E1F-N5E_88764544': 2,
    'E1C-NB6_1466202208': 1,
    'SZ-ESW01_-791440173': 3,
    'SZ-ESW01-AU_-791440173': 3,
    'XHS2-SE_574458647': 1,
    'SZ-DWS04_574458647': 1,
    'SZ-DWS08_574458647': 1,
    'AL-PIR02_491743244': 1,
    'HLD503-Z-CT_88764544': 2,
    'TH1123ZB_-1682995705': 4,
    'TH1124ZB_-1177875299': 3,
    'TH1300ZB_-161211044': 3,
    'TH1400ZB_-1088069291': 1,
    'TH1500ZB_-1088069291': 1,
    'SW2500ZB_1466202208': 1,
    'SP2600ZB_1466202208': 1,
    'DM2500ZB_-1455162343': 1,
    'RM3250ZB_1677026278': 1,
    'S9ZGBRC01_-994008938': 1,
    '5p1vj8r_821693351': 1,
    'HGZB-07A_88764544': 2,
    'NUE-ZBFLB_-652790423': 1,
    '4040B_78017069': 2,
    'STS-PRS-251_-508328146': 2,
    '3325-S_574458647': 1,
    '3321-S_-1404293857': 1,
    'F-APP-UK-V2_-1982020985': 1,
    'GP-WOU019BBDWG_-457752856': 3,
    'IM6001-OTP05_1466202208': 1,
    'STS-OUT-US-2_892764799': 2,
    'IM6001-MTP01_574458647': 1,
    'STS-IRM-251_574458647': 1,
    'STS-IRM-250_489153923': 1,
    '3305-S_574458647': 1,
    '3300-S_574458647': 1,
    'F-MLT-US-2_1097106025': 2,
    'IM6001-MPP01_1360637225': 2,
    '3310-S_1136066114': 2,
    '3315-S_574458647': 1,
    'WTR-UK-V2_574458647': 1,
    'IM6001-WLP01_574458647': 1,
    'STS-WTR-250_1585486317': 2,
    '3315-G_574458647': 1,
    'IM6001-BTP01_574458647': 1,
    'SZ-SRN12N_-994008938': 1,
    'ZBMINI_-1232867022': 1,
    'S31ZB_-353372667': 1,
    'SNZB-04_172811876': 1,
    'SNZB-01_323577616': 1,
    'SNZB-02_-1105870073': 3,
    'SNZB-03_563431407': 1,
    'ST218_2110948859': 2,
    'STZB402_2110948859': 1,
    'SMT402_185351366': 2,
    'SMT402AD_185351366': 2,
    'ZG192910-4_88764544': 2,
    'ZG9101SAC-HP_-1674843135': 1,
    'ZG9101SAC-HP-Switch_-1755039265': 1,
    'ZG2835RAC_-1861546705': 2,
    'SR-ZG9040A_-1861546705': 2,
    'SR-ZG9040A-S_-1674843135': 1,
    'SR-ZG9100A-S_-1755039265': 1,
    'SR-ZG9080A_424359850': 1,
    '73743_-1899270577': 1,
    '73742_88764544': 2,
    '73741_88764544': 2,
    '73740_88764544': 2,
    '73739_88764544': 2,
    '73693_88764544': 2,
    '73773_88764544': 2,
    '72922-A_1466202208': 1,
    '71831_88764544': 2,
    '74282_88764544': 2,
    'LTFY004_1676534437': 2,
    '72569_88764544': 2,
    '72567_88764544': 2,
    '75541_88764544': 2,
    'TERNCY-LS01_-353372667': 1,
    '3RSS007Z_1466202208': 3,
    '3RSL011Z_88764544': 2,
    '3RSL012Z_88764544': 2,
    'TPZRCO2HT-Z3_1622086385': 2,
    'ZWLD-100_491743244': 1,
    'ZLED-TUNE9_88764544': 2,
    'ZPIR-8000_491743244': 1,
    'ZCTS-808_491743244': 1,
    'WHD02_-1851317188': 1,
    'TS0505B_88764544': 2,
    'TS0503B_1676534437': 2,
    'TS0504B_1676534437': 2,
    'TS0108_241577581': 1,
    'TS0601_dimmer_-1560235388': 1,
    'TS0601_switch_72637060': 1,
    'TS0601_switch_2_gang_1261674374': 1,
    'TS0601_switch_3_gang_-1884513748': 1,
    'TS0215A_remote_1750255244': 1,
    'TS0503A_1676534437': 2,
    'TS0502A_88764544': 2,
    'TS0504A_88764544': 2,
    'TS0505A_88764544': 2,
    'TS0041_346438280': 1,
    'TS0042_491743244': 1,
    'TS0001_-1851317188': 1,
    'TS0002_-1884513748': 3,
    'TS0121_plug_-917712964': 1,
    'TS0601_din_-353372667': 1,
    'TS0115_1886156532': 1,
    'TS0011_1681093717': 2,
    'TS0012_918350781': 2,
    'TS0013_-885858470': 2,
    'TS0014_891847970': 2,
    'gq8b1uv_-1560235388': 1,
    'TS0004_-652790423': 1,
    'TS0006_-1915097310': 1,
    'U86KWF-ZPSJ_2080074453': 1,
    'E220-KR4N0Z0-HA_-652790423': 1,
    'TS0216_-994008938': 1,
    'S1_1057123855': 3,
    'S1-R_-1045329648': 3,
    'S2_1147184145': 3,
    'D1_-1045329648': 3,
    'J1_34944581': 1,
    'C4_-1860800622': 1,
    'XHS2-UE_574458647': 1,
    'SM-SO306EZ-10_2125574690': 1,
    'ZK03840_803369124': 3,
    '14592.0_1681128303': 3,
    'MCT-340 E_574458647': 1,
    'MCT-340 SMA_574458647': 1,
    'U02I007C.01_-835617255': 1,
    '8840100H_-282709555': 1,
    '9GED18000-009_1226555785': 4,
    '9GED21500-005_1226555785': 3,
    'URC4450BC0-X-R_1764952399': 1,
    'XDD12LM_88764544': 2,
    'XDD13LM_88764544': 2,
    'JWSP001A_88764544': 2,
    'JWDL001A_88764544': 2,
    'WXKG06LM_-1392309340': 1,
    'WS-USC01_1466202208': 1,
    'WS-USC02_1620506091': 1,
    'WS-USC03_1466202208': 1,
    'WS-USC04_1620506091': 1,
    'QBKG04LM_-265702992': 1,
    'QBKG03LM_-265702992': 1,
    'QBKG21LM_-265702992': 1,
    'QBKG22LM_-265702992': 1,
    'QBKG25LM_-581830709': 1,
    'QBKG26LM_-581830709': 1,
    'WSDCGQ11LM_-150999557': 1,
    'WSDCGQ12LM_-1602939088': 1,
    'RTCGQ12LM_1043360472': 1,
    'RTCGQ13LM_-189603484': 1,
    'SP-EUC01_877088476': 3,
    'ZNCLDJ12LM_185298305': 1,
    'ZNMS12LM_-265702992': 1,
    'ZNMS13LM_-265702992': 1,
    'WXCJKG11LM_-934383155': 1,
    'WXCJKG12LM_-304697434': 1,
    'WXCJKG13LM_-304697434': 1,
    'GZCGQ01LM_-944874515': 2,
    'ZNTGMK11LM_88764544': 2,
    'SSM-U01_-1008457051': 1,
    'SSM-U02_1466202208': 1,
    'YRD426NRSC_923668394': 3,
    'YRD226HA2619_923668394': 2,
    'YRD256HA20BP_923668394': 2,
    'YMF40/YDM4109+_923668394': 2,
    'YRD210-HA-605_923668394': 1,
    'YRL-220L_923668394': 1,
    'YRD226/246 TSDB_923668394': 2,
    'YRD220/YRD221_923668394': 1,
    'YRD246HA20BP_923668394': 1,
    'YRD216-HA2-619_923668394': 3,
    'YRL226L TS_923668394': 2,
    'D10110_-881591257': 1,
    'YSR-MINI-01_rgbcct_88764544': 2,
    'YSR-MINI-01_wwcw_88764544': 2,
    'LXZB-12A_88764544': 2,
    'HGZB-DLC4-N15B_88764544': 2,
    'ZM-CSW032-D_-1692060902': 1,
    'ZM-L03E-Z_-1997814597': 1,
    'Zen-01-W_-942356398': 1,
    'rgbw2.zbee27_88764544': 2,
};

exports.getConfigureKey = getConfigureKey;

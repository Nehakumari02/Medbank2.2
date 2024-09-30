import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const flags = [
    'ad.svg', 'ae.svg', 'af.svg', 'ag.svg', 'ai.svg', 'al.svg', 'am.svg', 'ao.svg', 'aq.svg', 'ar.svg', 'as.svg', 'at.svg', 'au.svg',
    'aw.svg', 'ax.svg', 'az.svg', 'ba.svg', 'bb.svg', 'bd.svg', 'be.svg', 'bf.svg', 'bg.svg', 'bh.svg', 'bi.svg', 'bj.svg', 'bl.svg',
    'bm.svg', 'bn.svg', 'bo.svg', 'bq.svg', 'br.svg', 'bs.svg', 'bt.svg', 'bv.svg', 'bw.svg', 'by.svg', 'bz.svg', 'ca.svg', 'cc.svg',
    'cd.svg', 'cf.svg', 'cg.svg', 'ch.svg', 'ci.svg', 'ck.svg', 'cl.svg', 'cm.svg', 'cn.svg', 'co.svg', 'cr.svg', 'cu.svg', 'cv.svg',
    'cw.svg', 'cx.svg', 'cy.svg', 'cz.svg', 'de.svg', 'dj.svg', 'dk.svg', 'dm.svg', 'do.svg', 'dz.svg', 'ec.svg', 'ee.svg', 'eg.svg',
    'eh.svg', 'er.svg', 'es.svg', 'et.svg', 'eu.svg', 'fi.svg', 'fj.svg', 'fk.svg', 'fm.svg', 'fo.svg', 'fr.svg', 'ga.svg', 'gb-eng.svg',
    'gb-nir.svg', 'gb-sct.svg', 'gb-wls.svg', 'gb.svg', 'gd.svg', 'ge.svg', 'gf.svg', 'gg.svg', 'gh.svg', 'gi.svg', 'gl.svg', 'gm.svg',
    'gn.svg', 'gp.svg', 'gq.svg', 'gr.svg', 'gs.svg', 'gt.svg', 'gu.svg', 'gw.svg', 'gy.svg', 'hk.svg', 'hm.svg', 'hn.svg', 'hr.svg',
    'ht.svg', 'hu.svg', 'id.svg', 'ie.svg', 'il.svg', 'im.svg', 'in.svg', 'io.svg', 'iq.svg', 'ir.svg', 'is.svg', 'it.svg', 'je.svg',
    'jm.svg', 'jo.svg', 'jp.svg', 'ke.svg', 'kg.svg', 'kh.svg', 'ki.svg', 'km.svg', 'kn.svg', 'kp.svg', 'kr.svg', 'kw.svg', 'ky.svg',
    'kz.svg', 'la.svg', 'lb.svg', 'lc.svg', 'li.svg', 'lk.svg', 'lr.svg', 'ls.svg', 'lt.svg', 'lu.svg', 'lv.svg', 'ly.svg', 'ma.svg',
    'mc.svg', 'md.svg', 'me.svg', 'mf.svg', 'mg.svg', 'mh.svg', 'mk.svg', 'ml.svg', 'mm.svg', 'mn.svg', 'mo.svg', 'mp.svg', 'mq.svg',
    'mr.svg', 'ms.svg', 'mt.svg', 'mu.svg', 'mv.svg', 'mw.svg', 'mx.svg', 'my.svg', 'mz.svg', 'na.svg', 'nc.svg', 'ne.svg', 'nf.svg',
    'ng.svg', 'ni.svg', 'nl.svg', 'no.svg', 'np.svg', 'nr.svg', 'nu.svg', 'nz.svg', 'om.svg', 'pa.svg', 'pe.svg', 'pf.svg', 'pg.svg',
    'ph.svg', 'pk.svg', 'pl.svg', 'pm.svg', 'pn.svg', 'pr.svg', 'ps.svg', 'pt.svg', 'pw.svg', 'py.svg', 'qa.svg', 're.svg', 'ro.svg',
    'rs.svg', 'ru.svg', 'rw.svg', 'sa.svg', 'sb.svg', 'sc.svg', 'sd.svg', 'se.svg', 'sg.svg', 'sh.svg', 'si.svg', 'sj.svg', 'sk.svg',
    'sl.svg', 'sm.svg', 'sn.svg', 'so.svg', 'sr.svg', 'ss.svg', 'st.svg', 'sv.svg', 'sx.svg', 'sy.svg', 'sz.svg', 'tc.svg', 'td.svg',
    'tf.svg', 'tg.svg', 'th.svg', 'tj.svg', 'tk.svg', 'tl.svg', 'tm.svg', 'tn.svg', 'to.svg', 'tr.svg', 'tt.svg', 'tv.svg', 'tw.svg',
    'tz.svg', 'ua.svg', 'ug.svg', 'um.svg', 'us.svg', 'uy.svg', 'uz.svg', 'va.svg', 'vc.svg', 've.svg', 'vg.svg', 'vi.svg', 'vn.svg',
    'vu.svg', 'wf.svg', 'ws.svg', 'xk.svg', 'ye.svg', 'yt.svg', 'za.svg', 'zm.svg', 'zw.svg'
];

const flagToCountry = {
    'ad.svg': 'Andorra',
    'ae.svg': 'UAE',
    'af.svg': 'Afghan.',
    'ag.svg': 'Antigua',
    'ai.svg': 'Anguilla',
    'al.svg': 'Albania',
    'am.svg': 'Armenia',
    'ao.svg': 'Angola',
    'aq.svg': 'Antarctica',
    'ar.svg': 'Argentina',
    'as.svg': 'American Samoa',
    'at.svg': 'Austria',
    'au.svg': 'Australia',
    'aw.svg': 'Aruba',
    'ax.svg': 'Aland Islands',
    'az.svg': 'Azerb.',
    'ba.svg': 'Bosnia',
    'bb.svg': 'Barbados',
    'bd.svg': 'Bangladesh',
    'be.svg': 'Belgium',
    'bf.svg': 'Burkina Faso',
    'bg.svg': 'Bulgaria',
    'bh.svg': 'Bahrain',
    'bi.svg': 'Burundi',
    'bj.svg': 'Benin',
    'bl.svg': 'Saint Barth.',
    'bm.svg': 'Bermuda',
    'bn.svg': 'Brunei',
    'bo.svg': 'Bolivia',
    'bq.svg': 'Caribbean NL',
    'br.svg': 'Brazil',
    'bs.svg': 'Bahamas',
    'bt.svg': 'Bhutan',
    'bv.svg': 'Bouvet Island',
    'bw.svg': 'Botswana',
    'by.svg': 'Belarus',
    'bz.svg': 'Belize',
    'ca.svg': 'Canada',
    'cc.svg': 'Cocos Islands',
    'cd.svg': 'DR Congo',
    'cf.svg': 'Central Africa',
    'cg.svg': 'Congo',
    'ch.svg': 'Switzerland',
    'ci.svg': 'Ivory Coast',
    'ck.svg': 'Cook Islands',
    'cl.svg': 'Chile',
    'cm.svg': 'Cameroon',
    'cn.svg': 'China',
    'co.svg': 'Colombia',
    'cr.svg': 'Costa Rica',
    'cu.svg': 'Cuba',
    'cv.svg': 'Cape Verde',
    'cw.svg': 'Curaçao',
    'cx.svg': 'Christmas Isl.',
    'cy.svg': 'Cyprus',
    'cz.svg': 'Czechia',
    'de.svg': 'Germany',
    'dj.svg': 'Djibouti',
    'dk.svg': 'Denmark',
    'dm.svg': 'Dominica',
    'do.svg': 'Dom. Republic',
    'dz.svg': 'Algeria',
    'ec.svg': 'Ecuador',
    'ee.svg': 'Estonia',
    'eg.svg': 'Egypt',
    'eh.svg': 'West. Sahara',
    'er.svg': 'Eritrea',
    'es.svg': 'Spain',
    'et.svg': 'Ethiopia',
    'fi.svg': 'Finland',
    'fj.svg': 'Fiji',
    'fk.svg': 'Falklands',
    'fm.svg': 'Micronesia',
    'fo.svg': 'Faroe Islands',
    'fr.svg': 'France',
    'ga.svg': 'Gabon',
    'gb.svg': 'UK',
    'gd.svg': 'Grenada',
    'ge.svg': 'Georgia',
    'gf.svg': 'Fr. Guiana',
    'gg.svg': 'Guernsey',
    'gh.svg': 'Ghana',
    'gi.svg': 'Gibraltar',
    'gl.svg': 'Greenland',
    'gm.svg': 'Gambia',
    'gn.svg': 'Guinea',
    'gp.svg': 'Guadeloupe',
    'gq.svg': 'Eq. Guinea',
    'gr.svg': 'Greece',
    'gt.svg': 'Guatemala',
    'gu.svg': 'Guam',
    'gw.svg': 'Guinea-Bissau',
    'gy.svg': 'Guyana',
    'hk.svg': 'Hong Kong',
    'hm.svg': 'Heard Island',
    'hn.svg': 'Honduras',
    'hr.svg': 'Croatia',
    'ht.svg': 'Haiti',
    'hu.svg': 'Hungary',
    'id.svg': 'Indonesia',
    'ie.svg': 'Ireland',
    'il.svg': 'Israel',
    'im.svg': 'Isle of Man',
    'in.svg': 'India',
    'io.svg': 'BIOT',
    'iq.svg': 'Iraq',
    'ir.svg': 'Iran',
    'is.svg': 'Iceland',
    'it.svg': 'Italy',
    'je.svg': 'Jersey',
    'jm.svg': 'Jamaica',
    'jo.svg': 'Jordan',
    'jp.svg': 'Japan',
    'ke.svg': 'Kenya',
    'kg.svg': 'Kyrgyzstan',
    'kh.svg': 'Cambodia',
    'ki.svg': 'Kiribati',
    'km.svg': 'Comoros',
    'kn.svg': 'Saint Kitts',
    'kp.svg': 'N. Korea',
    'kr.svg': 'S. Korea',
    'kw.svg': 'Kuwait',
    'ky.svg': 'Cayman Islands',
    'kz.svg': 'Kazakhstan',
    'la.svg': 'Laos',
    'lb.svg': 'Lebanon',
    'lc.svg': 'Saint Lucia',
    'li.svg': 'Liechtenstein',
    'lk.svg': 'Sri Lanka',
    'lr.svg': 'Liberia',
    'ls.svg': 'Lesotho',
    'lt.svg': 'Lithuania',
    'lu.svg': 'Luxembourg',
    'lv.svg': 'Latvia',
    'ly.svg': 'Libya',
    'ma.svg': 'Morocco',
    'mc.svg': 'Monaco',
    'md.svg': 'Moldova',
    'me.svg': 'Montenegro',
    'mf.svg': 'Saint Martin',
    'mg.svg': 'Madagascar',
    'mh.svg': 'Marshall Isl.',
    'mk.svg': 'N. Macedonia',
    'ml.svg': 'Mali',
    'mm.svg': 'Myanmar',
    'mn.svg': 'Mongolia',
    'mo.svg': 'Macau',
    'mp.svg': 'N. Mariana Isl.',
    'mq.svg': 'Martinique',
    'mr.svg': 'Mauritania',
    'ms.svg': 'Montserrat',
    'mt.svg': 'Malta',
    'mu.svg': 'Mauritius',
    'mv.svg': 'Maldives',
    'mw.svg': 'Malawi',
    'mx.svg': 'Mexico',
    'my.svg': 'Malaysia',
    'mz.svg': 'Mozambique',
    'na.svg': 'Namibia',
    'nc.svg': 'New Caledonia',
    'ne.svg': 'Niger',
    'nf.svg': 'Norfolk Isl.',
    'ng.svg': 'Nigeria',
    'ni.svg': 'Nicaragua',
    'nl.svg': 'Netherlands',
    'no.svg': 'Norway',
    'np.svg': 'Nepal',
    'nr.svg': 'Nauru',
    'nu.svg': 'Niue',
    'nz.svg': 'New Zealand',
    'om.svg': 'Oman',
    'pa.svg': 'Panama',
    'pe.svg': 'Peru',
    'pf.svg': 'Fr. Polynesia',
    'pg.svg': 'Papua N. Guinea',
    'ph.svg': 'Philippines',
    'pk.svg': 'Pakistan',
    'pl.svg': 'Poland',
    'pm.svg': 'Saint Pierre',
    'pn.svg': 'Pitcairn Isl.',
    'pr.svg': 'Puerto Rico',
    'ps.svg': 'Palestine',
    'pt.svg': 'Portugal',
    'pw.svg': 'Palau',
    'py.svg': 'Paraguay',
    'qa.svg': 'Qatar',
    're.svg': 'Réunion',
    'ro.svg': 'Romania',
    'rs.svg': 'Serbia',
    'ru.svg': 'Russia',
    'rw.svg': 'Rwanda',
    'sa.svg': 'Saudi Arabia',
    'sb.svg': 'Solomon Isl.',
    'sc.svg': 'Seychelles',
    'sd.svg': 'Sudan',
    'se.svg': 'Sweden',
    'sg.svg': 'Singapore',
    'sh.svg': 'Saint Helena',
    'si.svg': 'Slovenia',
    'sj.svg': 'Svalbard',
    'sk.svg': 'Slovakia',
    'sl.svg': 'Sierra Leone',
    'sm.svg': 'San Marino',
    'sn.svg': 'Senegal',
    'so.svg': 'Somalia',
    'sr.svg': 'Suriname',
    'ss.svg': 'South Sudan',
    'st.svg': 'Sao Tome',
    'sv.svg': 'El Salvador',
    'sx.svg': 'Sint Maarten',
    'sy.svg': 'Syria',
    'sz.svg': 'Eswatini',
    'tc.svg': 'Turks & Caicos',
    'td.svg': 'Chad',
    'tf.svg': 'Fr. So. Terr.',
    'tg.svg': 'Togo',
    'th.svg': 'Thailand',
    'tj.svg': 'Tajikistan',
    'tk.svg': 'Tokelau',
    'tl.svg': 'Timor-Leste',
    'tm.svg': 'Turkmenistan',
    'tn.svg': 'Tunisia',
    'to.svg': 'Tonga',
    'tr.svg': 'Turkey',
    'tt.svg': 'Trinidad',
    'tv.svg': 'Tuvalu',
    'tw.svg': 'Taiwan',
    'tz.svg': 'Tanzania',
    'ua.svg': 'Ukraine',
    'ug.svg': 'Uganda',
    'um.svg': 'US Outlying Isl.',
    'us.svg': 'USA',
    'uy.svg': 'Uruguay',
    'uz.svg': 'Uzbekistan',
    'va.svg': 'Vatican City',
    'vc.svg': 'Saint Vincent',
    've.svg': 'Venezuela',
    'vg.svg': 'British VI',
    'vi.svg': 'US Virgin Isl.',
    'vn.svg': 'Vietnam',
    'vu.svg': 'Vanuatu',
    'wf.svg': 'Wallis & Futuna',
    'ws.svg': 'Samoa',
    'xk.svg': 'Kosovo',
    'ye.svg': 'Yemen',
    'yt.svg': 'Mayotte',
    'za.svg': 'S. Africa',
    'zm.svg': 'Zambia',
    'zw.svg': 'Zimbabwe'
};

const flagToCountryCode = {
    'ad.svg': '+376',  // Andorra
    'ae.svg': '+971',  // United Arab Emirates
    'af.svg': '+93',   // Afghanistan
    'ag.svg': '+1-268', // Antigua and Barbuda
    'ai.svg': '+1-264', // Anguilla
    'al.svg': '+355',  // Albania
    'am.svg': '+374',  // Armenia
    'ao.svg': '+244',  // Angola
    'aq.svg': '+672',  // Antarctica
    'ar.svg': '+54',   // Argentina
    'as.svg': '+1-684',// American Samoa
    'at.svg': '+43',   // Austria
    'au.svg': '+61',   // Australia
    'aw.svg': '+297',  // Aruba
    'az.svg': '+994',  // Azerbaijan
    'ba.svg': '+387',  // Bosnia and Herzegovina
    'bb.svg': '+1-246',// Barbados
    'bd.svg': '+880',  // Bangladesh
    'be.svg': '+32',   // Belgium
    'bf.svg': '+226',  // Burkina Faso
    'bg.svg': '+359',  // Bulgaria
    'bh.svg': '+973',  // Bahrain
    'bi.svg': '+257',  // Burundi
    'bj.svg': '+229',  // Benin
    'bl.svg': '+590',  // Saint Barthelemy
    'bm.svg': '+1-441',// Bermuda
    'bn.svg': '+673',  // Brunei
    'bo.svg': '+591',  // Bolivia
    'br.svg': '+55',   // Brazil
    'bs.svg': '+1-242',// Bahamas
    'bt.svg': '+975',  // Bhutan
    'bw.svg': '+267',  // Botswana
    'by.svg': '+375',  // Belarus
    'bz.svg': '+501',  // Belize
    'ca.svg': '+1',    // Canada
    'cc.svg': '+61',   // Cocos Islands
    'cd.svg': '+243',  // Democratic Republic of the Congo
    'cf.svg': '+236',  // Central African Republic
    'cg.svg': '+242',  // Republic of the Congo
    'ch.svg': '+41',   // Switzerland
    'ci.svg': '+225',  // Ivory Coast
    'ck.svg': '+682',  // Cook Islands
    'cl.svg': '+56',   // Chile
    'cm.svg': '+237',  // Cameroon
    'cn.svg': '+86',   // China
    'co.svg': '+57',   // Colombia
    'cr.svg': '+506',  // Costa Rica
    'cu.svg': '+53',   // Cuba
    'cv.svg': '+238',  // Cape Verde
    'cw.svg': '+599',  // Curacao
    'cy.svg': '+357',  // Cyprus
    'cz.svg': '+420',  // Czech Republic
    'de.svg': '+49',   // Germany
    'dj.svg': '+253',  // Djibouti
    'dk.svg': '+45',   // Denmark
    'dm.svg': '+1-767',// Dominica
    'do.svg': '+1-809',// Dominican Republic
    'dz.svg': '+213',  // Algeria
    'ec.svg': '+593',  // Ecuador
    'ee.svg': '+372',  // Estonia
    'eg.svg': '+20',   // Egypt
    'er.svg': '+291',  // Eritrea
    'es.svg': '+34',   // Spain
    'et.svg': '+251',  // Ethiopia
    'fi.svg': '+358',  // Finland
    'fj.svg': '+679',  // Fiji
    'fk.svg': '+500',  // Falkland Islands
    'fm.svg': '+691',  // Micronesia
    'fo.svg': '+298',  // Faroe Islands
    'fr.svg': '+33',   // France
    'ga.svg': '+241',  // Gabon
    'gb.svg': '+44',   // United Kingdom
    'gd.svg': '+1-473',// Grenada
    'ge.svg': '+995',  // Georgia
    'gf.svg': '+594',  // French Guiana
    'gg.svg': '+44-1481',// Guernsey
    'gh.svg': '+233',  // Ghana
    'gi.svg': '+350',  // Gibraltar
    'gl.svg': '+299',  // Greenland
    'gm.svg': '+220',  // Gambia
    'gn.svg': '+224',  // Guinea
    'gq.svg': '+240',  // Equatorial Guinea
    'gr.svg': '+30',   // Greece
    'gt.svg': '+502',  // Guatemala
    'gu.svg': '+1-671',// Guam
    'gw.svg': '+245',  // Guinea-Bissau
    'gy.svg': '+592',  // Guyana
    'hk.svg': '+852',  // Hong Kong
    'hn.svg': '+504',  // Honduras
    'hr.svg': '+385',  // Croatia
    'ht.svg': '+509',  // Haiti
    'hu.svg': '+36',   // Hungary
    'id.svg': '+62',   // Indonesia
    'ie.svg': '+353',  // Ireland
    'il.svg': '+972',  // Israel
    'im.svg': '+44-1624',// Isle of Man
    'in.svg': '+91',   // India
    'io.svg': '+246',  // British Indian Ocean Territory
    'iq.svg': '+964',  // Iraq
    'ir.svg': '+98',   // Iran
    'is.svg': '+354',  // Iceland
    'it.svg': '+39',   // Italy
    'je.svg': '+44-1534',// Jersey
    'jm.svg': '+1-876',// Jamaica
    'jo.svg': '+962',  // Jordan
    'jp.svg': '+81',   // Japan
    'ke.svg': '+254',  // Kenya
    'kg.svg': '+996',  // Kyrgyzstan
    'kh.svg': '+855',  // Cambodia
    'ki.svg': '+686',  // Kiribati
    'km.svg': '+269',  // Comoros
    'kn.svg': '+1-869',// Saint Kitts and Nevis
    'kp.svg': '+850',  // North Korea
    'kr.svg': '+82',   // South Korea
    'kw.svg': '+965',  // Kuwait
    'ky.svg': '+1-345',// Cayman Islands
    'kz.svg': '+7',    // Kazakhstan
    'la.svg': '+856',  // Laos
    'lb.svg': '+961',  // Lebanon
    'lc.svg': '+1-758',// Saint Lucia
    'li.svg': '+423',  // Liechtenstein
    'lk.svg': '+94',   // Sri Lanka
    'lr.svg': '+231',  // Liberia
    'ls.svg': '+266',  // Lesotho
    'lt.svg': '+370',  // Lithuania
    'lu.svg': '+352',  // Luxembourg
    'lv.svg': '+371',  // Latvia
    'ly.svg': '+218',  // Libya
    'ma.svg': '+212',  // Morocco
    'mc.svg': '+377',  // Monaco
    'md.svg': '+373',  // Moldova
    'me.svg': '+382',  // Montenegro
    'mf.svg': '+590',  // Saint Martin
    'mg.svg': '+261',  // Madagascar
    'mh.svg': '+692',  // Marshall Islands
    'mk.svg': '+389',  // North Macedonia
    'ml.svg': '+223',  // Mali
    'mm.svg': '+95',   // Myanmar
    'mn.svg': '+976',  // Mongolia
    'mo.svg': '+853',  // Macau
    'mp.svg': '+1-670',// Northern Mariana Islands
    'mq.svg': '+596',  // Martinique
    'mr.svg': '+222',  // Mauritania
    'ms.svg': '+1-664',// Montserrat
    'mt.svg': '+356',  // Malta
    'mu.svg': '+230',  // Mauritius
    'mv.svg': '+960',  // Maldives
    'mw.svg': '+265',  // Malawi
    'mx.svg': '+52',   // Mexico
    'my.svg': '+60',   // Malaysia
    'mz.svg': '+258',  // Mozambique
    'na.svg': '+264',  // Namibia
    'nc.svg': '+687',  // New Caledonia
    'ne.svg': '+227',  // Niger
    'nf.svg': '+672',  // Norfolk Island
    'ng.svg': '+234',  // Nigeria
    'ni.svg': '+505',  // Nicaragua
    'nl.svg': '+31',   // Netherlands
    'no.svg': '+47',   // Norway
    'np.svg': '+977',  // Nepal
    'nr.svg': '+674',  // Nauru
    'nu.svg': '+683',  // Niue
    'nz.svg': '+64',   // New Zealand
    'om.svg': '+968',  // Oman
    'pa.svg': '+507',  // Panama
    'pe.svg': '+51',   // Peru
    'pf.svg': '+689',  // French Polynesia
    'pg.svg': '+675',  // Papua New Guinea
    'ph.svg': '+63',   // Philippines
    'pk.svg': '+92',   // Pakistan
    'pl.svg': '+48',   // Poland
    'pm.svg': '+508',  // Saint Pierre and Miquelon
    'pn.svg': '+64',   // Pitcairn Islands
    'pr.svg': '+1-787',// Puerto Rico
    'pt.svg': '+351',  // Portugal
    'pw.svg': '+680',  // Palau
    'py.svg': '+595',  // Paraguay
    'qa.svg': '+974',  // Qatar
    're.svg': '+262',  // Réunion
    'ro.svg': '+40',   // Romania
    'rs.svg': '+381',  // Serbia
    'ru.svg': '+7',    // Russia
    'rw.svg': '+250',  // Rwanda
    'sa.svg': '+966',  // Saudi Arabia
    'sb.svg': '+677',  // Solomon Islands
    'sc.svg': '+248',  // Seychelles
    'sd.svg': '+249',  // Sudan
    'se.svg': '+46',   // Sweden
    'sg.svg': '+65',   // Singapore
    'sh.svg': '+290',  // Saint Helena
    'si.svg': '+386',  // Slovenia
    'sj.svg': '+47',   // Svalbard and Jan Mayen
    'sk.svg': '+421',  // Slovakia
    'sl.svg': '+232',  // Sierra Leone
    'sm.svg': '+378',  // San Marino
    'sn.svg': '+221',  // Senegal
    'so.svg': '+252',  // Somalia
    'sr.svg': '+597',  // Suriname
    'ss.svg': '+211',  // South Sudan
    'st.svg': '+239',  // São Tomé and Príncipe
    'sv.svg': '+503',  // El Salvador
    'sx.svg': '+1-721',// Sint Maarten
    'sy.svg': '+963',  // Syria
    'sz.svg': '+268',  // Eswatini
    'tc.svg': '+1-649',// Turks and Caicos Islands
    'td.svg': '+235',  // Chad
    'tf.svg': '+262',  // French Southern Territories
    'tg.svg': '+228',  // Togo
    'th.svg': '+66',   // Thailand
    'tj.svg': '+992',  // Tajikistan
    'tk.svg': '+690',  // Tokelau
    'tl.svg': '+670',  // Timor-Leste
    'tm.svg': '+993',  // Turkmenistan
    'tn.svg': '+216',  // Tunisia
    'to.svg': '+676',  // Tonga
    'tr.svg': '+90',   // Turkey
    'tt.svg': '+1-868',// Trinidad and Tobago
    'tv.svg': '+688',  // Tuvalu
    'tz.svg': '+255',  // Tanzania
    'ua.svg': '+380',  // Ukraine
    'ug.svg': '+256',  // Uganda
    'us.svg': '+1',    // United States
    'uy.svg': '+598',  // Uruguay
    'uz.svg': '+998',  // Uzbekistan
    'va.svg': '+39',   // Vatican City
    'vc.svg': '+1-784',// Saint Vincent and the Grenadines
    've.svg': '+58',   // Venezuela
    'vg.svg': '+1-284',// British Virgin Islands
    'vi.svg': '+1-340',// U.S. Virgin Islands
    'vn.svg': '+84',   // Vietnam
    'vu.svg': '+678',  // Vanuatu
    'wf.svg': '+681',  // Wallis and Futuna
    'ws.svg': '+685',  // Samoa
    'ye.svg': '+967',  // Yemen
    'yt.svg': '+262',  // Mayotte
    'za.svg': '+27',   // South Africa
    'zm.svg': '+260',  // Zambia
    'zw.svg': '+263',  // Zimbabwe
    // Add more as needed
  };
  
  


export default function CountryDropdown({ country, setCountry, selectedFlag, setSelectedFlag }) {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedFlag, setSelectedFlag] = useState('ad.svg');
    // const [country, setCountry] = useState('Andorra');
    // const [selectedFlag, setSelectedFlag] = useState('ad.svg');

    const handleFlagSelect = async (flag) => {
        setSelectedFlag(flag);
        setCountry(flagToCountry[flag]); // Convert flag to country
        setIsOpen(false);

        // if (onCountryChange) {
        //     await onCountryChange(country); // Pass country to parent
        // }
    };

    // const handleFlagSelect = (flag) => {
    //     setSelectedFlag(flag);
    //     setIsOpen(false);
    // };

    useEffect(() => {
        // Find flag by country name
        const flag = Object.keys(flagToCountry).find(key => flagToCountry[key] === country);
        if (flag) {
            setSelectedFlag(flag);
        }
    }, [country, setSelectedFlag]);

    return (
        <div className="">
            <Select onValueChange={(value) => handleFlagSelect(value)} value={selectedFlag}>
                <SelectTrigger className="bg-white w-[82px] h-[39px] md:h-[51px] focus:outline-none">
                    <img src={`/flags/${selectedFlag}`} alt="Selected Flag" className="w-6 h-4 bg-white border-[2px] border-black  py-1 px-1 mx-1" />
                </SelectTrigger>
                <SelectContent className="w-full bg-white max-h-40 overflow-y-auto">
                    <SelectGroup>
                        {flags.map((flag) => (
                            <SelectItem
                                key={flag}
                                className="flex items-center justify-start w-[82px] h-[40px] px-4 py-2 cursor-pointer bg-white hover:bg-gray-200"
                                value={flag}
                            >
                                <img
                                    src={`/flags/${flag}`}
                                    alt={flag}
                                    className="w-4 h-4 mr-2"
                                />
                                <span className="text-sm text-left flex-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {flagToCountryCode[flag]}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>

            </Select>
        </div>
    );
}

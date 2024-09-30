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
                                    {flagToCountry[flag]}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>

            </Select>
        </div>
    );
}

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
    'jp.svg','af.svg', 'ax.svg', 'al.svg', 'dz.svg', 'as.svg', 'ad.svg', 'ao.svg', 'ai.svg', 'aq.svg', 'ag.svg', 'ar.svg', 'am.svg', 'aw.svg',
    'au.svg', 'at.svg', 'az.svg', 'bs.svg', 'bh.svg', 'bd.svg', 'bb.svg', 'by.svg', 'be.svg', 'bz.svg', 'bj.svg', 'bm.svg', 'bt.svg',
    'bo.svg', 'bq.svg', 'ba.svg', 'bw.svg', 'bv.svg', 'br.svg', 'io.svg', 'bn.svg', 'bg.svg', 'bf.svg', 'bi.svg', 'cv.svg', 'kh.svg',
    'cm.svg', 'ca.svg', 'ky.svg', 'cf.svg', 'td.svg', 'cl.svg', 'cn.svg', 'cx.svg', 'cc.svg', 'co.svg', 'km.svg', 'cg.svg', 'cd.svg',
    'ck.svg', 'cr.svg', 'hr.svg', 'cu.svg', 'cw.svg', 'cy.svg', 'cz.svg', 'dk.svg', 'dj.svg', 'dm.svg', 'do.svg', 'ec.svg', 'eg.svg',
    'sv.svg', 'gq.svg', 'er.svg', 'ee.svg', 'et.svg', 'fk.svg', 'fo.svg', 'fj.svg', 'fi.svg', 'fr.svg', 'gf.svg', 'pf.svg', 'tf.svg',
    'ga.svg', 'gm.svg', 'ge.svg', 'de.svg', 'gh.svg', 'gi.svg', 'gr.svg', 'gl.svg', 'gd.svg', 'gp.svg', 'gu.svg', 'gt.svg', 'gg.svg',
    'gn.svg', 'gw.svg', 'gy.svg', 'ht.svg', 'hm.svg', 'hn.svg', 'hk.svg', 'hu.svg', 'is.svg', 'in.svg', 'id.svg', 'ir.svg', 'iq.svg',
    'ie.svg', 'im.svg', 'il.svg', 'it.svg', 'ci.svg', 'jm.svg',  'je.svg', 'jo.svg', 'kz.svg', 'ke.svg', 'ki.svg', 'kp.svg',
    'kr.svg', 'kw.svg', 'kg.svg', 'la.svg', 'lv.svg', 'lb.svg', 'ls.svg', 'lr.svg', 'ly.svg', 'li.svg', 'lt.svg', 'lu.svg', 'mo.svg',
    'mg.svg', 'mw.svg', 'my.svg', 'mv.svg', 'ml.svg', 'mt.svg', 'mh.svg', 'mq.svg', 'mr.svg', 'mu.svg', 'yt.svg', 'mx.svg', 'fm.svg',
    'md.svg', 'mc.svg', 'mn.svg', 'me.svg', 'ms.svg', 'ma.svg', 'mz.svg', 'mm.svg', 'na.svg', 'nr.svg', 'np.svg', 'nl.svg', 'nc.svg',
    'nz.svg', 'ni.svg', 'ne.svg', 'ng.svg', 'nu.svg', 'nf.svg', 'mk.svg', 'mp.svg', 'no.svg', 'om.svg', 'pk.svg', 'pw.svg', 'ps.svg',
    'pa.svg', 'pg.svg', 'py.svg', 'pe.svg', 'ph.svg', 'pn.svg', 'pl.svg', 'pt.svg', 'pr.svg', 'qa.svg', 're.svg', 'ro.svg', 'ru.svg',
    'rw.svg', 'bl.svg', 'sh.svg', 'kn.svg', 'lc.svg', 'mf.svg', 'pm.svg', 'vc.svg', 'ws.svg', 'sm.svg', 'st.svg', 'sa.svg', 'sn.svg',
    'rs.svg', 'sc.svg', 'sl.svg', 'sg.svg', 'sx.svg', 'sk.svg', 'si.svg', 'sb.svg', 'so.svg', 'za.svg', 'gs.svg', 'ss.svg', 'es.svg',
    'lk.svg', 'sd.svg', 'sr.svg', 'sj.svg', 'sz.svg', 'se.svg', 'ch.svg', 'sy.svg', 'tw.svg', 'tj.svg', 'tz.svg', 'th.svg', 'tl.svg',
    'tg.svg', 'tk.svg', 'to.svg', 'tt.svg', 'tn.svg', 'tr.svg', 'tm.svg', 'tc.svg', 'tv.svg', 'ug.svg', 'ua.svg', 'ae.svg', 'gb.svg',
    'us.svg', 'um.svg', 'uy.svg', 'uz.svg', 'vu.svg', 've.svg', 'vn.svg', 'vg.svg', 'vi.svg', 'wf.svg', 'eh.svg', 'ye.svg', 'zm.svg',
    'zw.svg', 'xk.svg'
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

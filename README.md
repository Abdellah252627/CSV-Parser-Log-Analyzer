# CSV Parser

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

أداة سطر أوامر قوية لتحويل ملفات CSV إلى JSON مع إمكانية التحليل والفلترة والفرز.

## ✨ المميزات

- **تحويل سريع**: CSV → JSON بنقرة واحدة
- **تحليل ذكي**: إحصائيات تلقائية (متوسط، تجميعات، تعدادات)
- **فلترة مرنة**: تصفية حسب أي حقل وقيمة
- **فرز متعدد**: ترتيب تصاعدي/تنازلي للأرقام والنصوص
- **معالجة أخطاء**: رسائل واضحة ومساعدة مدمجة

## 📦 التثبيت

```bash
# استنساخ المشروع
git clone <repo-url>
cd csv-parser

# تثبيت التبعيات
npm install
```

## 🚀 الاستخدام السريع

```bash
# عرض جميع الأوامر
npm start

# تحويل CSV إلى JSON
npm start convert

# عرض الإحصائيات
npm start analyze

# فلترة حسب المدينة
npm start filter city Riyadh

# فرز حسب العمر (تنازلي)
npm start sort age desc
```

## 📋 الأوامر بالتفصيل

| الأمر | الوصف | مثال |
|--------|---------|-------|
| `convert` | يحول `data/input.csv` إلى `data/output.json` | `npm start convert` |
| `analyze` | يعرض إحصائيات شاملة للبيانات | `npm start analyze` |
| `filter <field> <value>` | يعرض السجلات المطابقة فقط | `npm start filter city Riyadh` |
| `sort <field> [asc\|desc]` | يرتب البيانات | `npm start sort salary asc` |

### حقول الفلترة والفرز المدعومة
- `name` — الاسم
- `age` — العمر (رقمي)
- `city` — المدينة
- `job` — الوظيفة
- `salary` — الراتب (رقمي)

## 📊 أمثلة على المخرجات

### `npm start analyze`
```text
📊 الإحصائيات:
   إجمالي: 8 أشخاص
   متوسط العمر: 27.6
   المدن:
     Riyadh: 3
     Jeddah: 3
     Dammam: 2
   الوظائف:
     Developer: 3
     Designer: 1
     Manager: 1
     Analyst: 1
     Director: 1
     Senior Dev: 1
```

### `npm start filter city Riyadh`
```text
🔍 نتائج الفلترة (city = Riyadh):
┌─────────┬────────────┬──────┬──────────┬─────────────┬────────┐
│ (index) │ name       │ age  │ city     │ job         │ salary │
├─────────┼────────────┼──────┼──────────┼─────────────┼────────┤
│ 0       │ 'Abdullah' │ '25' │ 'Riyadh' │ 'Developer' │ '5000' │
│ 1       │ 'Noor'     │ '28' │ 'Riyadh' │ 'Developer' │ '5500' │
│ 2       │ 'Layla'    │ '23' │ 'Riyadh' │ 'Developer' │ '4900' │
└─────────┴────────────┴──────┴──────────┴─────────────┴────────┘
```

### `npm start sort salary asc`
```text
📋 البيانات مرتبة حسب salary (asc):
┌─────────┬────────────┬──────┬──────────┬──────────────┬────────┐
│ (index) │ name       │ age  │ city     │ job          │ salary │
├─────────┼────────────┼──────┼──────────┼──────────────┼────────┤
│ 0       │ 'Sara'     │ '26' │ 'Jeddah' │ 'Analyst'    │ '4200' │
│ 1       │ 'Ahmed'    │ '30' │ 'Jeddah' │ 'Designer'   │ '4500' │
│ ...                                                │        │
└─────────┴────────────┴──────┴──────────┴──────────────┴────────┘
```

## 🗂️ هيكل المشروع

```
csv-parser/
├── src/
│   ├── parser.js     # قراءة CSV + تحويل إلى JSON + حفظ
│   ├── analyzer.js   # فلترة + فرز + إحصائيات
│   └── cli.js        # واجهة سطر الأوامر الرئيسية
├── data/
│   ├── input.csv     # بيانات الإدخال (قم بتعديلها)
│   └── output.json   # يُنشأ تلقائياً عند التحويل
├── package.json
└── README.md
```

## 🔧 واجهة برمجة التطبيقات (API)

### parser.js
```javascript
import { readCSV, saveJSON } from './src/parser.js';

// قراءة ملف CSV وإرجاع مصفوفة كائنات
const data = await readCSV('data/input.csv');

// حفظ مصفوفة كائنات كملف JSON
await saveJSON(data, 'data/output.json');
```

### analyzer.js
```javascript
import { filterByField, sortByField, getStatistics } from './src/analyzer.js';

// فلترة: إرجاع السجلات التي تطابق field = value
const riyadhUsers = filterByField(data, 'city', 'Riyadh');

// فرز: ترتيب مصفوفة حسب حقل (افتراضي: asc)
const byAgeDesc = sortByField(data, 'age', 'desc');
const byNameAsc = sortByField(data, 'name', 'asc');

// إحصائيات: كائن ملخص
const stats = getStatistics(data);
// {
//   totalRecords: 8,
//   averageAge: 27.6,
//   cityCounts: { Riyadh: 3, Jeddah: 3, Dammam: 2 },
//   jobCounts: { Developer: 3, Designer: 1, ... }
// }
```

## 📝 تنسيق بيانات الإدخال

يجب أن يكون ملف `data/input.csv` بالتنسيق التالي:

```csv
name,age,city,job,salary
Abdullah,25,Riyadh,Developer,5000
Ahmed,30,Jeddah,Designer,4500
...
```

- **السطر الأول**: الرؤوس (headers) — أسماء الحقول
- **الأسطر التالية**: البيانات — قيم مفصولة بفواصل
- **الحقول الرقمية**: `age` و `salary` تُعامل كأرقام للفرز

## ⚠️ استكشاف الأخطاء

| المشكلة | الحل |
|----------|-------|
| `ENOENT: no such file` | تأكد من وجود `data/input.csv` |
| `الأمر غير معروف` | اكتب `npm start` لرؤية قائمة الأوامر |
| `الترتيب يجب أن يكون asc أو desc` | استخدم `asc` أو `desc` فقط |
| قيم فارغة في الناتج | تأكد من عدم وجود أسطر فارغة في CSV |

## 🛠️ التطوير

```bash
# تشغيل مع المراقبة التلقائية
npm run dev

# تشغيل مباشر
node src/cli.js <command>
```

## 📄 الترخيص

ISC License — راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

**مُنشأ بواسطة**: Abdullah  
**الإصدار**: 1.0.0
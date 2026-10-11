import { readCSV, saveJSON } from './parser.js';
import { filterByField, sortByField, getStatistics } from './analyzer.js';

const INPUT_FILE = 'data/input.csv';
const OUTPUT_FILE = 'data/output.json';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'convert': {
        const data = await readCSV(INPUT_FILE);
        await saveJSON(data, OUTPUT_FILE);
        console.log('✅ تم التحويل بنجاح');
        break;
      }
      
      case 'analyze': {
        const data = await readCSV(INPUT_FILE);
        const stats = getStatistics(data);
        
        console.log('📊 الإحصائيات:');
        console.log(`   إجمالي: ${stats.totalRecords} أشخاص`);
        console.log(`   متوسط العمر: ${stats.averageAge}`);
        console.log('   المدن:');
        for (const [city, count] of Object.entries(stats.cityCounts)) {
          console.log(`     ${city}: ${count}`);
        }
        console.log('   الوظائف:');
        for (const [job, count] of Object.entries(stats.jobCounts)) {
          console.log(`     ${job}: ${count}`);
        }
        break;
      }
      
      case 'filter': {
        const field = args[1];
        const value = args[2];
        
        if (!field || !value) {
          console.error('❌ الاستخدام: npm start filter <field> <value>');
          process.exit(1);
        }
        
        const data = await readCSV(INPUT_FILE);
        const filtered = filterByField(data, field, value);
        
        if (filtered.length === 0) {
          console.log(`❌ لا توجد نتائج لـ ${field} = ${value}`);
        } else {
          console.log(`🔍 نتائج الفلترة (${field} = ${value}):`);
          console.table(filtered);
        }
        break;
      }
      
      case 'sort': {
        const field = args[1];
        const order = args[2] || 'asc';
        
        if (!field) {
          console.error('❌ الاستخدام: npm start sort <field> [asc|desc]');
          process.exit(1);
        }
        
        if (order !== 'asc' && order !== 'desc') {
          console.error('❌ الترتيب يجب أن يكون asc أو desc');
          process.exit(1);
        }
        
        const data = await readCSV(INPUT_FILE);
        const sorted = sortByField(data, field, order);
        
        console.log(`📋 البيانات مرتبة حسب ${field} (${order}):`);
        console.table(sorted);
        break;
      }
      
      default:
        console.log('📖 الأوامر المتاحة:');
        console.log('  npm start convert          - تحويل CSV إلى JSON');
        console.log('  npm start analyze          - عرض الإحصائيات');
        console.log('  npm start filter <field> <value>  - فلترة البيانات');
        console.log('  npm start sort <field> [asc|desc] - فرز البيانات');
        break;
    }
  } catch (error) {
    console.error('❌ خطأ:', error.message);
    process.exit(1);
  }
}

main();
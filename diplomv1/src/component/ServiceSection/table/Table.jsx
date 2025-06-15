import { Megaphone, ArrowRight,Smartphone,Globe,Target,ChartBar,Zap} from 'lucide-react';
import  { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Table.css";

function Table({
  icon = <Megaphone size={32} color="#FFFFFF" />,
  title = "Контекстная реклама",
  description = "Яндекс.Директ и Google Ads. Настройка, ведение и оптимизация рекламных кампаний с гарантированным ROI.",
  items = [
    "Аудит текущих компаний",
    "Сбор семантики",
    "A/B тестирование"
  ],
  arrowColor = "#A149F2",
  iconBgColor = "#A149F2",
  slug = "ads"
}) {
    const navigate = useNavigate();
  // Варианты анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className='TableInfo'
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px rgba(161, 73, 242, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(`/leads/${slug}`)}
    >
      <motion.div 
        className='TableImg'
        style={{ backgroundColor: iconBgColor }}
        variants={itemVariants}
        whileHover={{
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 }
        }}
      >
        {icon}
      </motion.div>

      <motion.h1 variants={itemVariants}>
        {title}
      </motion.h1>

      <motion.p variants={itemVariants}>
        {description}
      </motion.p>

      <motion.div variants={containerVariants}>
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className='arrows'
            variants={itemVariants}
            custom={index}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <ArrowRight 
              size={16} 
              color={arrowColor} 
              style={{ marginRight: 5 }} 
            />
            {item}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Table;
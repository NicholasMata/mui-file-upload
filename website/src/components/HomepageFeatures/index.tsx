import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface FeatureItem {
  title: string;
  image: string;
  description: JSX.Element;
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    image: '/img/feature-easy.png',
    description: (
      <>A simple and easy way to add file upload to your projects. Components ready to use of the out-of-the-box.</>
    ),
  },
  {
    title: 'Customizable',
    image: '/img/feature-customizable.png',
    description: <>Though it is easy to use the library it is also highly flexible and customizable.</>,
  },
  {
    title: 'Beautiful',
    image: '/img/feature-beautiful.png',
    description: <>Built on top of Material UI, the component is beautiful out-of-the-box.</>,
  },
];

function Feature({ title, image, description }: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img className={styles.featureSvg} src={image} />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

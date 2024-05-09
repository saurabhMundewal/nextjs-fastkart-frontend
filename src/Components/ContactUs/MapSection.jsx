import WrapperComponent from '../Common/WrapperComponent';

const MapSection = () => {
  return (
    <WrapperComponent classes={{ sectionClass: 'map-section', fluidClass: 'p-0' }} noRowCol={true}>
      <div className='map-box'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.0565127041846!2d75.52311137441612!3d31.329812356534255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5bec1b096ac9%3A0x94f37e8f8cfa562!2sVector%20x!5e0!3m2!1sen!2sin!4v1715146507198!5m2!1sen!2sin'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'></iframe>
      </div>
    </WrapperComponent>
  );
};

export default MapSection;

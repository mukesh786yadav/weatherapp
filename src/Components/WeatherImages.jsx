import React from 'react'

const WeatherImages = ({formattedDescription}) => {

    const weatherImages = {
        brokenclouds: "https://img.freepik.com/free-photo/beautiful-natural-clouds-sky_23-2148825010.jpg?t=st=1713686837~exp=1713690437~hmac=fa51ccb5c0e67677ac9c0d77f3c50c36d00d9f99c22070f7ee33883cc38b089f&w=740",
        fewclouds: "https://img.freepik.com/free-photo/sky-with-clouds-trees_1136-62.jpg?t=st=1713686733~exp=1713690333~hmac=6317cf6f65c3eac9d9c33678472c4170da5a68c24d9aed0095a9c347ad4044da&w=740",
        overcastclouds: "https://img.freepik.com/free-photo/blue-sky-with-cloud-closeup_150588-128.jpg?t=st=1713685367~exp=1713688967~hmac=522125332d86481f2bee2bb1e267b4e7d4be976f9ff34299a2a878cceb1e74a7&w=740",
        clearsky: "https://img.freepik.com/free-photo/blue-sky-clouds_1417-1861.jpg?t=st=1713686978~exp=1713690578~hmac=e35cb096490d07a5323fcbd31d5396189fbf4dd7a8ffb583addfc2a51cc936a8&w=740",
        scatteredclouds:"https://img.freepik.com/free-photo/sky-covered-with-clouds_1122-742.jpg?t=st=1713687110~exp=1713690710~hmac=f642a874326cc449f938ad25c592e021bf982dc49064ba9df4043666ecc5a704&w=740",
        moderaterain:"https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?t=st=1713687266~exp=1713690866~hmac=dff8eecd11e6f24784e13f2f593f0228da6e6e24238c46fb97919ccf8779910f&w=740",
        default_image_url:"https://img.freepik.com/free-photo/fluffy-clouds-blue-sky_23-2148824931.jpg?t=st=1713687428~exp=1713691028~hmac=5976136647dbac545690bfc2f332526be7bd9c5825f458d598250206f2db0a21&w=740"
      };

    const imageUrl = weatherImages[formattedDescription] || default_image_url;  

  return (
    <>
      <img
          className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
          src={imageUrl}
          alt=""
        />
    </>
  )
}

export default WeatherImages
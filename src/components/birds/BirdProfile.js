import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import getBird from '../../actions/bird';
import ProfilePicture from '../helpers/ProfilePicture';
import Banner from '../presentation/Banner';
import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import './BirdProfile.css';

class BirdProfile extends Component {
  componentDidMount() {
    const { slug, dispatch } = this.props;
    dispatch(getBird(slug));
  }

  render() {
    const { slug, birds } = this.props;

    if (birds[slug]) {
      if (birds[slug].pending) return <Loader />;
      else if (birds[slug].rejected) return <Error reason={ birds.value.message }/>;
      else if (birds[slug].fulfilled) {
        const bird = birds[slug].value;
        const extended = bird.bird_extended ? bird.bird_extended : null;

        return (
          <div className="BirdProfile">
            <Helmet title={ bird.name } />
            <Banner>
              <h1>{ bird.name }</h1>
              <ProfilePicture bird={ bird } classNames={ ["img-responsive"] } size="large" />
            </Banner>
            <ul>
              <li>{ bird.sex }</li>
              <li>{ bird.status }</li>
              <li>{ bird.get_life_stage }</li>
              <li>{ bird.study_area }</li>
              <li>{ bird.primary_band }</li>
              <li>{ bird.band_combo }</li>
            </ul>
            { extended &&
              <ul>
                <li>{ extended.description }</li>
                <li>{ extended.sponsor_name } { extended.sponsor_website }</li>
                <li>{ extended.profile_picture_attribution }</li>
              </ul>
            }
          </div>
        );
      }
    }
    else return null;
  }
};

BirdProfile.propTypes = {
  slug: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return { birds: state.birds };
}

export default connect(mapStateToProps)(BirdProfile);

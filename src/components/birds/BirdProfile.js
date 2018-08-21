import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { getBird } from '../../actions/birds';

import PrettyBandCombo from '../helpers/PrettyBandCombo';
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
      if (birds[slug].birdPending) return <Loader />;
      else if (birds[slug].birdRejected) return <Error reason={ birds[slug].birdValue.message }/>;
      else if (birds[slug].birdFulfilled) {
        const bird = birds[slug].birdValue;
        const extended = bird.bird_extended ? bird.bird_extended : null;

        const details = [bird.get_life_stage, bird.sex]

        if (bird.primary_band) {
          details.push('·');
          details.push(bird.primary_band);
        }

        return (
          <div className="BirdProfile">
            <Helmet title={ bird.name } />
            <Banner size="small" additionalClasses="mb-4">
              <div className="row">
                <div className="col-md-4 order-md-9 profile-picture">
                  <figure>
                    <ProfilePicture bird={ bird } classNames={ ['img-fluid'] } size="large" />
                  </figure>
                </div>

                <div className="col-md-8 order-md-1">
                  <h1 className="mb-3">{ bird.name }</h1>
                  <li className="list-unstyled mb-3">
                    <li><i className="fas fa-fw fa-info-circle"></i> { details.join(' ') }</li>
                    <li><i className="fas fa-fw fa-map-marker-alt"></i> { bird.study_area }</li>
                    <li><i className="far fa-fw fa-circle"></i> { bird.band_combo }</li>
                  </li>
                  <div className="band-combo">
                    <PrettyBandCombo bandCombo={ bird.band_combo } />
                  </div>
                </div>
              </div>
            </Banner>
            { extended &&
              <div className="container extended">
                <div className="row">
                  <div className="col-lg-7">
                    <p className="description">{ extended.description }</p>
                    {extended.sponsor_name &&
                      <p><strong>Sponsor: </strong><a href={ extended.sponsor_website }>{ extended.sponsor_name }</a></p>
                    }
                    {extended.profile_picture_attribution &&
                      <p><i className="fas fa-camera"></i> { extended.profile_picture_attribution }</p>
                    }
                  </div>
                </div>
              </div>
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
};

const mapStateToProps = (state) => {
  return { birds: state.birds };
};

export default connect(mapStateToProps)(BirdProfile);
